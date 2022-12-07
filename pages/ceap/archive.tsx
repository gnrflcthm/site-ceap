import { PageWithLayout } from "pages/_app";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import Head from "next/head";
import TopPanel from "@components/TopPanel";
import {
    Text,
    Center,
    CircularProgress,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Thead,
    Tr,
    Td,
    Box,
    Button,
    Stack,
} from "@chakra-ui/react";
import { AccountType, ResourceStatus } from "@util/Enums";
import { IResourceSchema, IUserSchema } from "@db/models";
import { connectDB } from "@db/index";
import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";
import { FilterQuery } from "mongoose";
import SearchBar from "@components/SearchBar";
import { FormEvent, useState } from "react";
import { FaCaretLeft, FaCaretRight, FaSync } from "react-icons/fa";

const ArchiveItem = dynamic(() => import("@components/Archive/ArchiveItem"));

const Archives: PageWithLayout = () => {
    const [query, setQuery] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const [sortKey, setSortKey] = useState<string>("datePerformed");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const { data, isLoading, refetch } = useData<ArchiveType[]>(
        "/api/resource/a/archive"
    );

    const search = (e: FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setPage(1);
        refetch(`/api/resource/a/archive?q=${query}&p=1`);
    };

    const sortData = (key: string) => {
        setPage(1);
        let currentDir = sortDir;
        if (key === sortKey) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
            currentDir = sortDir === "asc" ? "desc" : "asc";
        }
        setSortKey(key);

        if (isSearching) {
            refetch(
                `/api/resource/a/archive?q=${query}&p=${1}&sortBy=${key}&sortDir=${currentDir}`
            );
        } else {
            refetch(
                `/api/resource/a/archive?p=${1}&sortBy=${key}&sortDir=${currentDir}`
            );
        }
    };

    return (
        <>
            <Head>
                <title>Archived Resources</title>
            </Head>
            <TopPanel title={"Archived Resources"} />
            <Stack
                direction={{ base: "column-reverse", md: "row" }}
                p={"4"}
                minH={{ base: "11rem", md: "4.5rem" }}
                overflow={"hidden"}
                as={"form"}
                onSubmit={search}
            >
                <Button
                    onClick={() => {
                        refetch(
                            `/api/resource/a/archive?p=1&sortBy=dateUploaded&sortDir=desc`
                        );
                        setQuery("");
                        setIsSearching(false);
                        setSortDir("desc");
                        setSortKey("dateUploaded");
                        setPage(1);
                    }}
                    px={"8"}
                    w={{ base: "full", md: "max-content" }}
                >
                    <Center mr={"2"}>
                        <Box as={FaSync} w={"8"} />
                    </Center>
                    <Text color={"inherit"}>Refresh</Text>
                </Button>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    onSearch={search}
                    inputColor={"neutralizerDark"}
                    hasForm
                />
            </Stack>
            <Flex align={"center"} justify={"end"}>
                <Button
                    variant={"transparent"}
                    onClick={() => {
                        if (isSearching) {
                            refetch(
                                `/api/resource/a/archive?$q=${query}&p=${
                                    page - 1
                                }&sortBy=${sortKey}&sortDir=${sortDir}`
                            );
                        } else {
                            refetch(
                                `/api/resource/a/archive?p=${
                                    page - 1
                                }&sortBy=${sortKey}&sortDir=${sortDir}`
                            );
                        }
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
                        if (isSearching) {
                            refetch(
                                `/api/resource/a/archive?q=${query}&p=${
                                    page + 1
                                }&sortBy=${sortKey}&sortDir=${sortDir}`
                            );
                        } else {
                            refetch(
                                `/api/resource/a/archive?p=${
                                    page + 1
                                }&sortBy=${sortKey}&sortDir=${sortDir}`
                            );
                        }
                        setPage((p) => p + 1);
                    }}
                    disabled={isLoading || (data && data?.length < 30)}
                >
                    <Box as={FaCaretRight} color={"primary"} />
                </Button>
            </Flex>
            <TableContainer overflowY={"auto"}>
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
                                onClick={() => sortData("dateUploaded")}
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
                                heading={"uploaded by"}
                                sortable
                                onClick={() =>
                                    sortData("uploadedBy.displayName")
                                }
                            />
                            <TableHeader heading={""} />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.length > 0 ? (
                            data.map((resource) => (
                                <ArchiveItem
                                    key={resource._id}
                                    resource={resource}
                                />
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={4}>
                                    <Center>
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size={8}
                                                color={"secondary"}
                                            />
                                        ) : (
                                            <Text>No Resources Found.</Text>
                                        )}
                                    </Center>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export type ArchiveType = IResourceSchema & {
    _id: string;
    uploadedBy: IUserSchema & { _id: string };
};

export const getServerSideProps: GetServerSideProps = AuthGetServerSideProps(
    async ({ req, query }: GetServerSidePropsContextWithUser) => {
        return {
            props: {},
        };
    },
    [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN]
);

Archives.PageLayout = Layout;

export default Archives;
