import Head from "next/head";
import dynamic from "next/dynamic";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType, RequestStatus } from "@util/Enums";
import {
    connectDB,
    IResourceSchema,
    MemberSchool,
    Resource,
    User,
} from "@db/index";
import { AnimatePresence } from "framer-motion";
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
    Tooltip,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";
import TabButton from "@components/Accounts/TabButton";
import { FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import { useState } from "react";

const RequestUploadModal = dynamic(
    () => import("@components/Uploads/RequestUploadModal")
);

const ResourceData = dynamic(() => import("@components/Uploads/ResourceData"));

const UploadRequests: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ uploadRequests }) => {
    const { data, isLoading, refetch } = useData("", uploadRequests);

    const [current, setCurrent] = useState<"requests" | "uploads">("requests");

    const {
        isOpen: showUploadModal,
        onClose: closeUploadModal,
        onOpen: openUploadModal,
    } = useDisclosure();

    return (
        <>
            <Head>
                <title>Upload Requests</title>
            </Head>
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
                        Request For Upload
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
                                        : "upload status"
                                }
                            />
                            <TableHeader heading="" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            // @ts-ignore
                            data.map((resource) => (
                                <ResourceData
                                    showStatus={current === "uploads"}
                                    key={resource.id}
                                    resource={resource}
                                    refetch={() => {
                                        if (current === "requests") {
                                            refetch(`/api/resource/a/requests`);
                                        } else {
                                            refetch(`/api/resource/a`);
                                        }
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
                {showUploadModal && (
                    <RequestUploadModal
                        refetch={() => {
                            setCurrent("uploads");
                            refetch(`/api/resource/a`);
                        }}
                        close={() => closeUploadModal()}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

UploadRequests.PageLayout = Layout;

export const getServerSideProps: GetServerSideProps<{
    uploadRequests?: IResourceSchema & {
        id: string;
        uploadedBy?: { id: string; displayName?: string };
    };
}> = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        await connectDB();
        const user = await User.findOne({ authId: ctx.uid });

        if (!user) {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                    permanent: false,
                },
            };
        }

        let uploadRequests = await Resource.find({
            status: RequestStatus.FOR_ADMIN_REVIEW,
        })
            .populate({
                path: "uploadedBy",
                select: "id displayName memberSchool",
                populate: {
                    path: "memberSchool",
                    select: "id",
                },
            })
            .populate("folder", ["id", "name", "fullPath"])
            .exec();

        uploadRequests = uploadRequests.filter((ur) =>
            // @ts-ignore
            ur.uploadedBy?.memberSchool.equals(user.memberSchool)
        );

        return {
            props: {
                uploadRequests: uploadRequests.map((ur) => ({
                    ...ur.toJSON(),
                    dateAdded: ur.dateAdded.toDateString(),
                })),
            },
        };
    },
    [AccountType.MS_ADMIN]
);

export default UploadRequests;
