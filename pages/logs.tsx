import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import { GetServerSideProps } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType } from "@util/Enums";
import Head from "next/head";
import TopPanel from "@components/TopPanel";
import {
    Box,
    Button,
    Center,
    CircularProgress,
    Flex,
    Stack,
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
import { ILogSchema, IUserSchema } from "@db/index";
import LogData from "@components/Logs/LogData";
import { FaDownload, FaSync, FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { AnimatePresence } from "framer-motion";
import GenerateReportsModal from "@components/Logs/GenerateReportsModal";
import SearchBar from "@components/SearchBar";
import { FormEvent, useState } from "react";
import { useData } from "@util/hooks/useData";

const Logs: PageWithLayout = () => {
    const {
        isOpen: showReports,
        onOpen: openReports,
        onClose: closeReports,
    } = useDisclosure();

    const [query, setQuery] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const [sortKey, setSortKey] = useState<string>("datePerformed");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const { data, refetch, isLoading } = useData<LogDataInfo[]>(
        "/api/admin/logs?p=1&sortBy=datePerformed&sortDir=desc"
    );

    const search = (e: FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setPage(1);
        refetch(`/api/admin/logs?q=${query}&p=1`);
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
                `/api/admin/logs?q=${query}&p=${1}&sortBy=${key}&sortDir=${currentDir}`
            );
        } else {
            refetch(
                `/api/admin/logs?p=${1}&sortBy=${key}&sortDir=${currentDir}`
            );
        }
    };

    return (
        <>
            <Head>
                <title>Logs</title>
            </Head>
            <TopPanel
                title={"Audit Logs"}
                hasAction
                actionIcon={FaDownload}
                actionText={"Export"}
                onActionClick={() => openReports()}
            />
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
                            `/api/admin/logs?p=1&sortBy=datePerformed&sortDir=desc`
                        );
                        setQuery("");
                        setIsSearching(false);
                        setSortDir("desc");
                        setSortKey("datePerformed");
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
                    inputColor={"neutralizerDark"}
                    placeholder={"Search..."}
                    onSearch={search}
                    hasForm
                />
            </Stack>
            <Flex align={"center"} justify={"end"}>
                <Button
                    variant={"transparent"}
                    onClick={() => {
                        if (isSearching) {
                            refetch(
                                `/api/admin/logs?$q=${query}&p=${
                                    page - 1
                                }&sortBy=${sortKey}&sortDir=${sortDir}`
                            );
                        } else {
                            refetch(`/api/admin/logs?p=${page - 1}&sortBy=${sortKey}&sortDir=${sortDir}`);
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
                                `/api/admin/logs?q=${query}&p=${
                                    page + 1
                                }&sortBy=${sortKey}&sortDir=${sortDir}`
                            );
                        } else {
                            refetch(`/api/admin/logs?p=${page + 1}&sortBy=${sortKey}&sortDir=${sortDir}`);
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
                        maxH={{
                            base: "calc(85vh-11rem)",
                            md: "calc(85vh-4.5rem)",
                        }}
                    >
                        <Tr>
                            <TableHeader
                                heading={"Date Performed"}
                                sortable
                                onClick={() => sortData("datePerformed")}
                            />
                            <TableHeader
                                heading={"User"}
                                sortable
                                onClick={() => sortData("user.displayName")}
                            />
                            <TableHeader
                                heading={"Action"}
                                sortable
                                onClick={() => sortData("action")}
                            />
                            <TableHeader
                                heading={"Details"}
                                sortable
                                onClick={() => sortData("details")}
                            />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {(() => {
                            if (isLoading) {
                                return (
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
                                );
                            }

                            if (data && data.length > 0) {
                                return (
                                    <>
                                        {data.map((log) => (
                                            <LogData key={log.id} log={log} />
                                        ))}
                                    </>
                                );
                            } else {
                                return (
                                    <Tr>
                                        <Td colSpan={5}>
                                            <Center w={"full"}>
                                                <Text color={"neutralizerDark"}>
                                                    No Logs to be Viewed.
                                                </Text>
                                            </Center>
                                        </Td>
                                    </Tr>
                                );
                            }
                        })()}
                    </Tbody>
                </Table>
            </TableContainer>
            <AnimatePresence>
                {showReports && (
                    <GenerateReportsModal onDismiss={() => closeReports()} />
                )}
            </AnimatePresence>
        </>
    );
};

export type LogDataInfo = ILogSchema & {
    id: string;
    datePerformed: string;
    user: IUserSchema & { id: string };
    memberSchool?: string;
};

export const getServerSideProps: GetServerSideProps = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        return {
            props: {},
        };
    },
    [AccountType.CEAP_SUPER_ADMIN, AccountType.CEAP_ADMIN, AccountType.MS_ADMIN]
);

Logs.PageLayout = Layout;

export default Logs;
