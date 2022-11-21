import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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
    Select,
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
import { connectDB, ILogSchema, IUserSchema, Log, User } from "@db/index";
import LogData from "@components/Logs/LogData";
import { FaDownload, FaFileAlt, FaSync } from "react-icons/fa";

import { AnimatePresence } from "framer-motion";
import GenerateReportsModal from "@components/Logs/GenerateReportsModal";
import SearchBar from "@components/SearchBar";
import { FormEvent, useState } from "react";
import { useData } from "@util/hooks/useData";

const Logs: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ logs }) => {
    const {
        isOpen: showReports,
        onOpen: openReports,
        onClose: closeReports,
    } = useDisclosure();

    const [query, setQuery] = useState<string>("");
    const [criteria, setCriteria] = useState<string>("name");

    const { data, refetch, isLoading } = useData("", logs);

    const search = (e: FormEvent) => {
        if (!criteria) {
            return;
        }
        e.preventDefault();
        refetch(`/api/admin/logs?${criteria}=${query}`);
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
                        refetch(`/api/admin/logs`);
                        setQuery("");
                    }}
                    px={"8"}
                    w={{ base: "full", md: "max-content" }}
                >
                    <Center mr={"2"}>
                        <Box as={FaSync} w={"8"} />
                    </Center>
                    <Text color={"inherit"}>Refresh</Text>
                </Button>
                <Select
                    w={{ base: "full", md: "30%" }}
                    onChange={(e) => {
                        setCriteria(e.target.value);
                        setQuery("");
                    }}
                    required
                >
                    <option value={"name"} selected>
                        User's Name
                    </option>
                    <option value={"action"}>Action</option>
                    <option value={"details"}>Details</option>
                </Select>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    inputColor={"neutralizerDark"}
                    placeholder={"Search..."}
                    onSearch={search}
                    hasForm
                />
            </Stack>
            <TableContainer overflowY={"auto"}>
                <Table>
                    <Thead
                        bg={"gray.100"}
                        position={"sticky"}
                        top={"1"}
                        zIndex={"2"}
                        maxH={{
                            base: "calc(85vh-11rem)",
                            md: "calc(85vh-4.5rem)",
                        }}
                    >
                        <Tr>
                            <TableHeader heading={"Date Performed"} />
                            <TableHeader heading={"User"} />
                            <TableHeader heading={"Action"} />
                            <TableHeader heading={"Details"} />
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

export const getServerSideProps: GetServerSideProps<{
    logs?: LogDataInfo[];
}> = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        await connectDB();
        const user = await User.findOne({ authId: ctx.uid });
        if (user) {
            switch (user.accountType) {
                case AccountType.CEAP_SUPER_ADMIN:
                case AccountType.CEAP_ADMIN:
                    const logs = await Log.find({})
                        .populate("user", ["id", "displayName"])
                        .limit(30);

                    return {
                        props: {
                            logs: logs.map((log) => ({
                                ...log.toJSON(),
                                datePerformed: log.datePerformed.toString(),
                                memberSchool:
                                    log?.memberSchool?.toHexString() || "",
                            })),
                        },
                    };

                case AccountType.MS_ADMIN:
                    const logData = await Log.find({
                        memberSchool: user.memberSchool,
                    })
                        .populate("user", ["id", "displayName"])
                        .limit(30);
                    return {
                        props: {
                            logs: logData.map((log) => ({
                                ...log.toJSON(),
                                datePerformed: log.datePerformed.toString(),
                                memberSchool:
                                    log?.memberSchool?.toHexString() || "",
                            })),
                        },
                    };
            }
        }

        return {
            notFound: true,
        };
    },
    [AccountType.CEAP_SUPER_ADMIN, AccountType.CEAP_ADMIN, AccountType.MS_ADMIN]
);

Logs.PageLayout = Layout;

export default Logs;
