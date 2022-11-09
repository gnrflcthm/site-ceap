import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType } from "@util/Enums";
import Head from "next/head";
import TopPanel from "@components/TopPanel";
import { Box, Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react";
import TableHeader from "@components/TableHeader";
import { connectDB, ILogSchema, IUserSchema, Log, User } from "@db/index";
import LogData from "@components/Logs/LogData";

const Logs: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ logs }) => {
    return (
        <>
            <Head>
                <title>Logs</title>
            </Head>
            <TopPanel title={"Audit Logs"} />
            <Box w={"full"} bg={"red"}></Box>
            <TableContainer>
                <Table>
                    <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
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
                    let logs = await Log.find({}).populate("user", [
                        "id",
                        "displayName",
                    ]);
                    console.log(logs);
                    return {
                        props: {
                            logs: logs.map((log) => ({
                                ...log.toJSON(),
                                datePerformed: log.datePerformed.toString(),
                            })),
                        },
                    };

                case AccountType.MS_ADMIN:
                    logs = await Log.find({
                        memberSchool: user.memberSchool,
                    }).populate("user");
                    return {
                        props: {
                            logs: logs.map((log) => ({
                                ...log.toJSON(),
                                datePerformed: log.datePerformed.toString(),
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
