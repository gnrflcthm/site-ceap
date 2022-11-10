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
    Table,
    TableContainer,
    Tbody,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import TableHeader from "@components/TableHeader";
import { connectDB, ILogSchema, IUserSchema, Log, User } from "@db/index";
import LogData from "@components/Logs/LogData";
import { FaFileAlt } from "react-icons/fa";

import { generateAuditReport } from "@util/reports";
import { AnimatePresence } from "framer-motion";
import GenerateReportsModal from "@components/Logs/GenerateReportsModal";

const Logs: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ logs }) => {
    const {
        isOpen: showReports,
        onOpen: openReports,
        onClose: closeReports,
    } = useDisclosure();

    return (
        <>
            <Head>
                <title>Logs</title>
            </Head>
            <TopPanel
                title={"Audit Logs"}
                hasAction
                actionIcon={FaFileAlt}
                actionText={"Generate Reports"}
                onActionClick={() => openReports()}
            />
            <TableContainer overflowY={"auto"} h={"85vh"}>
                <Table>
                    <Thead
                        bg={"gray.100"}
                        position={"sticky"}
                        top={"1"}
                        zIndex={"2"}
                    >
                        <Tr>
                            <TableHeader heading={"Date Performed"} />
                            <TableHeader heading={"User"} />
                            <TableHeader heading={"Action"} />
                            <TableHeader heading={"Details"} />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {logs &&
                            logs.map((log) => (
                                <LogData key={log.id} log={log} />
                            ))}
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
                    const logs = await Log.find({}).populate("user", [
                        "id",
                        "displayName",
                    ]);

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
                    }).populate("user", ["id", "displayName"]);
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
