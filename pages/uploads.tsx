import Head from "next/head";
import dynamic from "next/dynamic";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";
import { GetServerSideProps } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType } from "@util/Enums";
import { connectDB, IResourceSchema, Resource, User } from "@db/index";
import { AnimatePresence } from "framer-motion";
import {
    Center,
    CircularProgress,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
    useDisclosure,
    Box,
    HStack,
    Flex,
    Text,
} from "@chakra-ui/react";
import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";

import {
    FaCaretLeft,
    FaCaretRight,
    FaCloudUploadAlt,
    FaSync,
} from "react-icons/fa";
import { IResourceDataType } from "@components/Uploads/ResourceData";
import { useState } from "react";
import ResourceInfoModal from "@components/Resources/ResourceInfoModal";

const RequestUploadModal = dynamic(
    () => import("@components/Uploads/RequestUploadModal")
);

const ResourceData = dynamic(() => import("@components/Uploads/ResourceData"));

const Uploads: PageWithLayout = () => {
    const [page, setPage] = useState<number>(1);

    const [sortKey, setSortKey] = useState<string>("datePerformed");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const { data, isLoading, refetch } =
        useData<IResourceDataType[]>("/api/resource/a");

    const {
        isOpen: showUploadModal,
        onClose: closeUploadModal,
        onOpen: openUploadModal,
    } = useDisclosure();

    const sortData = (key: string) => {
        setPage(1);
        let currentDir = sortDir;
        if (key === sortKey) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
            currentDir = sortDir === "asc" ? "desc" : "asc";
        }
        setSortKey(key);

        refetch(`/api/resource/a?p=${1}&sortBy=${key}&sortDir=${currentDir}`);
        console.log(
            `/api/resource/a?p=${1}&sortBy=${key}&sortDir=${currentDir}`
        );
    };

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
            <Flex align={"center"} justify={"end"}>
                <Button
                    variant={"transparent"}
                    onClick={() => {
                        refetch(
                            `/api/resource/a?p=${
                                page - 1
                            }&sortBy=${sortKey}&sortDir=${sortDir}`
                        );

                        setPage((p) => p - 1);
                    }}
                    disabled={page - 1 <= 0 || isLoading}
                >
                    <Box as={FaCaretLeft} color={"primary"} />
                </Button>
                <Text>{page}</Text>
                <Button
                    variant={"transparent"}
                    onClick={() => {
                        refetch(
                            `/api/resource/a?p=${
                                page + 1
                            }&sortBy=${sortKey}&sortDir=${sortDir}`
                        );

                        setPage((p) => p + 1);
                    }}
                    disabled={isLoading || (data && data?.length < 30)}
                >
                    <Box as={FaCaretRight} color={"primary"} />
                </Button>
            </Flex>
            <TableContainer maxH={"inherit"} overflowY={"auto"}>
                <Table>
                    <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                        <Tr>
                            <TableHeader
                                heading={"Date Uploaded"}
                                sortable
                                onClick={() => sortData("dateAdded")}
                            />
                            <TableHeader
                                heading={"File Name"}
                                sortable
                                onClick={() => sortData("filename")}
                            />
                            <TableHeader
                                heading={"file type"}
                                sortable
                                onClick={() => sortData("fileType")}
                            />
                            <TableHeader
                                heading={"upload status"}
                                sortable
                                onClick={() => sortData("status")}
                            />
                            <TableHeader heading="" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data &&
                            data.map((resource) => (
                                <ResourceData
                                    showStatus={true}
                                    key={resource._id}
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

export const getServerSideProps: GetServerSideProps = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        return { props: {} };
    },
    [AccountType.MS_USER]
);

export default Uploads;
