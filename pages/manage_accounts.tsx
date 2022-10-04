import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AccountType, MemberSchool, User } from "@prisma/client";
import {
    Box,
    Button,
    Text,
    CircularProgress,
    Flex,
    Heading,
    Center,
    Table,
    TableContainer,
    Thead,
    Tr,
    Tbody,
} from "@chakra-ui/react";
import { prisma } from "prisma/db";
import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";
import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";
import { FaSync } from "react-icons/fa";
import TopPanel from "@components/TopPanel";
import TableHeader from "@components/TableHeader";
import UserData from "@components/Accounts/UserData";
import { useData } from "@util/hooks/useData";

const ManageAccounts: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ accounts }) => {
    console.table(accounts);

    const { user, loading } = useContext(AuthContext);

    const { data, isLoading, refetch } = useData("/api/member/users", accounts);

    return (
        <>
            <Head>
                <title>Manage Accounts</title>
            </Head>
            <TopPanel
                title={"Manage Accounts"}
                hasAction
                actionIcon={FaSync}
                actionText={"Refresh"}
                onActionClick={() => {
                    refetch();
                    console.log("refetching");
                    console.log(isLoading);
                }}
            />
            {!user && isLoading ? (
                <Center h={"full"} w={"full"}>
                    <CircularProgress isIndeterminate color={"secondary"} />
                </Center>
            ) : (
                <TableContainer maxH={"inherit"} overflowY={"auto"}>
                    <Table>
                        <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                            <Tr>
                                <TableHeader
                                    heading={"full name"}
                                    subheading={"email address"}
                                    sortable
                                />
                                <TableHeader heading={"mobile #"} />
                                {user?.role ===
                                    AccountType.CEAP_SUPER_ADMIN && (
                                    <TableHeader heading={"account type"} />
                                )}
                                {["CEAP_ADMIN", "CEAP_SUPER_ADMIN"].includes(
                                    user?.role || ""
                                ) && <TableHeader heading={"member school"} />}
                                {user?.role === AccountType.MS_ADMIN && (
                                    <TableHeader heading={"school id"} />
                                )}
                                <TableHeader heading="" />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((account) => (
                                <UserData user={account} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    accounts?: (User & { memberSchool?: MemberSchool })[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        let accounts = undefined;
        try {
            const admin = await prisma.user.findFirst({
                where: {
                    authId: uid,
                },
            });

            if (!admin) {
                return {
                    redirect: {
                        destination: "/",
                        statusCode: 301,
                        permanent: false,
                    },
                };
            }

            switch (admin.accountType) {
                case AccountType.CEAP_SUPER_ADMIN:
                    accounts = await prisma.user.findMany({
                        where: {
                            accountType: {
                                in: [
                                    AccountType.CEAP_ADMIN,
                                    AccountType.CEAP_SUPER_ADMIN,
                                    AccountType.MS_ADMIN,
                                ],
                            },
                            AND: {
                                authId: {
                                    not: uid,
                                },
                            },
                        },
                        include: {
                            memberSchool: true,
                        },
                    });
                    break;
                case AccountType.CEAP_ADMIN:
                    accounts = await prisma.user.findMany({
                        where: {
                            accountType: AccountType.MS_ADMIN,
                            AND: {
                                authId: {
                                    not: uid,
                                },
                            },
                        },
                        include: {
                            memberSchool: true,
                        },
                    });
                    break;
                case AccountType.MS_ADMIN:
                    accounts = await prisma.user.findMany({
                        where: {
                            memberSchoolId: admin.memberSchoolId,
                            AND: {
                                authId: {
                                    not: uid,
                                },
                            },
                        },
                    });
                    break;
            }
        } catch (err) {
            console.log(err);
        }

        return {
            props: {
                accounts,
            },
        };
    }
);

ManageAccounts.PageLayout = Layout;

export default ManageAccounts;
