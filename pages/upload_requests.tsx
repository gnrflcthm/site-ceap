import Head from "next/head";
import dynamic from "next/dynamic";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType, ResourceStatus } from "@util/Enums";
import {
    connectDB,
    IResourceSchema,
    IUserSchema,
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
    Text,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";
import TabButton from "@components/Accounts/TabButton";
import {
    FaCaretLeft,
    FaCaretRight,
    FaCloudUploadAlt,
    FaSearch,
    FaUpload,
} from "react-icons/fa";
import { useState } from "react";
import { IResourceDataType } from "@components/Uploads/ResourceData";

const RequestUploadModal = dynamic(
    () => import("@components/Uploads/RequestUploadModal")
);

const ResourceData = dynamic(() => import("@components/Uploads/ResourceData"));

const UploadRequests: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
    const { data, isLoading, refetch } = useData<IResourceDataType[]>(
        "/api/resource/a/requests"
    );

    const [current, setCurrent] = useState<"requests" | "uploads">("requests");
    console.log(data);
    const [page, setPage] = useState<number>(1);

    const [sortKey, setSortKey] = useState<string>("datePerformed");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

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
            <Head>
                <title>Upload Requests</title>
            </Head>
            <TopPanel
                title={"Upload Requests"}
                actionIcon={FaUpload}
                actionText={"Upload"}
                onActionClick={() => openUploadModal()}
                hasAction
            />
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
                        Requests
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
                        zIndex={4}
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
                                        : "upload status"
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
                        {data &&
                            // @ts-ignore
                            data.map((resource) => (
                                <ResourceData
                                    showStatus={current === "uploads"}
                                    key={resource._id}
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
            status: ResourceStatus.FOR_ADMIN_REVIEW,
            memberSchool: user.memberSchool,
        })
            .populate("uploadedBy", ["id", "displayName"])
            .populate("folder", ["id", "name", "fullPath"])
            .exec();
        return {
            props: {
                uploadRequests: uploadRequests.map((ur) => ({
                    ...ur.toJSON(),
                    dateAdded: ur.dateAdded.toDateString(),
                    memberSchool: ur.memberSchool?.toHexString(),
                })),
            },
        };
    },
    [AccountType.MS_ADMIN]
);

export default UploadRequests;
