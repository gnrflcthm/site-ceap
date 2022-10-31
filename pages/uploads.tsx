import Head from "next/head";
import dynamic from "next/dynamic";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType } from "@util/Enums";
import { connectDB, IResourceSchema, Resource, User } from "@db/index";
import { AnimatePresence } from "framer-motion";
import {
    Center,
    CircularProgress,
    Flex,
    Button,
    Text,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
    useDisclosure,
    Box,
    HStack,
} from "@chakra-ui/react";
import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";

import { FaCloudUploadAlt, FaSync } from "react-icons/fa";

const RequestUploadModal = dynamic(
    () => import("@components/Uploads/RequestUploadModal")
);

const ResourceData = dynamic(() => import("@components/Uploads/ResourceData"));

const Uploads: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ uploadRequests }) => {
    const { data, isLoading, refetch } = useData<
        (IResourceSchema & {
            id: string;
            dateAdded: string;
            uploadedBy?: { id: string; name?: string };
        })[]
    >("/api/resource/a", uploadRequests);

    const {
        isOpen: showUploadModal,
        onClose: closeUploadModal,
        onOpen: openUploadModal,
    } = useDisclosure();

    return (
        <>
            <Head>
                <title>My Uploads</title>
            </Head>
            <TopPanel title={"My Uploads"} />
            <HStack w={"full"} p={"4"} justify={"flex-end"}>
                <Button
                    variant={"secondary"}
                    onClick={() => openUploadModal()}
                    w={"min-content"}
                    rounded={"md"}
                >
                    Request For Upload
                    <Box as={FaCloudUploadAlt} ml={"4"} fontSize={"xl"} />
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => refetch()}
                    w={"min-content"}
                    rounded={"md"}
                >
                    Refresh
                    <Box as={FaSync} ml={"4"} fontSize={"xl"} />
                </Button>
            </HStack>
            <TableContainer maxH={"inherit"} overflowY={"auto"}>
                <Table>
                    <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                        <Tr>
                            <TableHeader heading={"Date Uploaded"} sortable />
                            <TableHeader heading={"File Name"} />
                            <TableHeader heading={"file type"} />
                            <TableHeader heading={"upload status"} />
                            <TableHeader heading="" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map((resource) => (
                                <ResourceData
                                    key={resource.id}
                                    resource={resource}
                                    refetch={refetch}
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
                        refetch={refetch}
                        close={() => closeUploadModal()}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

Uploads.PageLayout = Layout;

export const getServerSideProps: GetServerSideProps<{
    uploadRequests?: (IResourceSchema & {
        id: string;
        dateAdded: string;
        uploadedBy?: { id: string; displayName?: string };
    })[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        await connectDB();
        const user = await User.findOne({ authId: uid });

        if (!user) {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                    permanent: false,
                },
            };
        }

        const uploadRequests = await Resource.find({
            uploadedBy: user.id,
        })
            .populate("uploadedBy", ["id", "displayName"])
            .populate("folder", ["id", "name", "fullPath"])
            .exec();
        return {
            props: {
                uploadRequests: uploadRequests.map((ur) => ({
                    ...ur.toJSON(),
                    dateAdded: ur.dateAdded.toDateString(),
                })),
            },
        };
    },
    [AccountType.MS_USER]
);

export default Uploads;
