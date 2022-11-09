import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextHead from "next/head";

import { PageWithLayout } from "../_app";

import {
    Box,
    Button,
    Center,
    CircularProgress,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";

import TopPanel from "@components/TopPanel";

import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import Layout from "@components/Layout";

import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";
import ResourceData from "@components/Uploads/ResourceData";

import { Resource, connectDB, IResourceSchema } from "@db/index";

import { AccountType, ResourceStatus, FileType } from "@util/Enums";
import TabButton from "@components/Accounts/TabButton";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import AcceptResourceModal from "@components/Uploads/AcceptResourceModal";
import UploadModal from "@components/Uploads/UploadModal";

const UploadRequests: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ uploads }) => {
    const { data, isLoading, refetch } = useData("", uploads);
    const [current, setCurrent] = useState<"requests" | "uploads">("requests");

    const {
        isOpen: showResourceModal,
        onClose: closeResourceModal,
        onOpen: openResourceModal,
    } = useDisclosure();

    const {
        isOpen: showUploadModal,
        onClose: closeUploadModal,
        onOpen: openUploadModal,
    } = useDisclosure();

    const [currentResource, setCurrentResource] = useState<
        ResourceType | undefined
    >(undefined);

    return (
        <>
            <NextHead>
                <title>Uploads</title>
            </NextHead>
            <TopPanel title={"Upload Requests"} />
            <Flex justify={"space-between"} align={"center"}>
                <Flex
                    justify={"flex-start"}
                    align={"center"}
                    m={"2"}
                    w={"full"}
                >
                    <TabButton
                        onClick={() => {
                            setCurrent("requests");
                            refetch(`/api/resource/a/requests`);
                        }}
                        isActive={current === "requests"}
                    >
                        Upload Requests
                    </TabButton>
                    <TabButton
                        onClick={() => {
                            setCurrent("uploads");
                            refetch(`/api/resource/a`);
                        }}
                        isActive={current === "uploads"}
                    >
                        My Uploads
                    </TabButton>
                </Flex>
                <Flex justify={"flex-end"} align={"center"} m={"2"} w={"full"}>
                    <Button
                        variant={"secondary"}
                        onClick={() => openUploadModal()}
                        w={"fit-content"}
                        rounded={"md"}
                    >
                        Upload Resource
                        <Box as={FaCloudUploadAlt} ml={"4"} fontSize={"xl"} />
                    </Button>
                </Flex>
            </Flex>
            <TableContainer maxH={"inherit"} overflowY={"auto"}>
                <Table>
                    <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                        <Tr>
                            <TableHeader heading={"Date Uploaded"} sortable />
                            <TableHeader heading={"File Name"} />
                            <TableHeader heading={"file type"} />
                            <TableHeader
                                heading={
                                    current === "requests"
                                        ? "uploader"
                                        : "status"
                                }
                            />
                            <TableHeader heading="" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((resource) => (
                            <ResourceData
                                showStatus={current === "uploads"}
                                key={resource.id}
                                resource={resource}
                                refetch={refetch}
                                onAccept={(id: string) => {
                                    const targetResource = data.find(
                                        (resource) => resource.id === id
                                    );
                                    setCurrentResource(targetResource);
                                    openResourceModal();
                                }}
                            />
                        ))}
                        {isLoading && (
                            <Tr>
                                <Td colSpan={5}>
                                    <Center h={"full"} w={"full"}>
                                        <CircularProgress
                                            isIndeterminate
                                            color={"secondary"}
                                        />
                                    </Center>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <AnimatePresence>
                {showResourceModal && !showUploadModal && (
                    <AcceptResourceModal
                        resource={currentResource}
                        close={() => {
                            closeResourceModal();
                            setCurrentResource(undefined);
                        }}
                    />
                )}
                {showUploadModal && !showResourceModal && (
                    <UploadModal onDismiss={() => closeUploadModal()} />
                )}
            </AnimatePresence>
        </>
    );
};

export type ResourceType = IResourceSchema & {
    id: string;
    dateAdded: string;
    uploadedBy: { id: string; displayName?: string };
};

export const getServerSideProps: GetServerSideProps<{
    uploads?: ResourceType[];
}> = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        await connectDB();

        const uploads = await Resource.find({
            status: ResourceStatus.FOR_CEAP_REVIEW,
        })
            .populate({ path: "uploadedBy", select: "id displayName" })
            .populate("folder", ["id", "name", "fullPath"])
            .exec();

        return {
            props: {
                uploads: uploads.map((resources) => ({
                    ...resources.toJSON(),
                    dateAdded: resources.dateAdded.toDateString(),
                })),
            },
        };
    },
    [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN, AccountType.MS_ADMIN]
);

UploadRequests.PageLayout = Layout;

export default UploadRequests;
