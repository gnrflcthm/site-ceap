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
    Text,
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
import ResourceData, {
    IResourceDataType,
} from "@components/Uploads/ResourceData";

import { Resource, connectDB, IResourceSchema, IUserSchema } from "@db/index";

import { AccountType, ResourceStatus, FileType } from "@util/Enums";
import TabButton from "@components/Accounts/TabButton";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight, FaCloudUploadAlt } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import AcceptResourceModal from "@components/Uploads/AcceptResourceModal";
import UploadModal from "@components/Uploads/UploadModal";

const UploadRequests: PageWithLayout = () => {
    const { data, isLoading, refetch } = useData<IResourceDataType[]>(
        "/api/resource/a/requests"
    );
    const [current, setCurrent] = useState<"requests" | "uploads">("requests");

    const [page, setPage] = useState<number>(1);

    const [sortKey, setSortKey] = useState<string>("datePerformed");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

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
        IResourceDataType | undefined
    >(undefined);

    const sortData = (key: string) => {
        setPage(1);
        let currentDir = sortDir;
        if (key === sortKey) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
            currentDir = sortDir === "asc" ? "desc" : "asc";
        }
        setSortKey(key);

        refetch(
            `/api/resource/a${
                current === "requests" ? "/requests" : ""
            }?p=${1}&sortBy=${key}&sortDir=${currentDir}`
        );
        console.log(
            `/api/resource/a${
                current === "requests" ? "/requests" : ""
            }?p=${1}&sortBy=${key}&sortDir=${currentDir}`
        );
    };

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
            <Flex align={"center"} justify={"end"}>
                <Button
                    variant={"transparent"}
                    onClick={() => {
                        refetch(
                            `/api/resource/a${
                                current === "requests" ? "/requests" : ""
                            }?p=${
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
                            `/api/resource/a${
                                current === "requests" ? "/requests" : ""
                            }?p=${
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
                    <Thead
                        bg={"gray.100"}
                        position={"sticky"}
                        top={"0"}
                        zIndex={"2"}
                    >
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
                                heading={
                                    current === "requests"
                                        ? "uploader"
                                        : "status"
                                }
                                sortable
                                onClick={() =>
                                    sortData(
                                        current === "requests"
                                            ? "uploadedBy.displayName"
                                            : "status"
                                    )
                                }
                            />
                            <TableHeader heading="" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((resource) => (
                            <ResourceData
                                showStatus={current === "uploads"}
                                key={resource._id}
                                resource={resource}
                                refetch={refetch}
                                onAccept={(id: string) => {
                                    const targetResource = data.find(
                                        (resource) => resource._id === id
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
                        reload={() => {
                            setCurrent("requests");
                            refetch(`/api/resource/a/requests`);
                        }}
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

export const getServerSideProps: GetServerSideProps = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        return { props: {} };
    },
    [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN, AccountType.MS_ADMIN]
);

UploadRequests.PageLayout = Layout;

export default UploadRequests;
