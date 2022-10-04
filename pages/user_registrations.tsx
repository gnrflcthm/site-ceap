import { useContext } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";

import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import { prisma } from "../prisma/db";
import {
    AccountType,
    UserRegistration,
    MSAdminRegistration,
    MemberSchool,
} from "@prisma/client";
import {
    Box,
    Button,
    CircularProgress,
    Flex,
    Heading,
    Text,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Thead,
    Center,
} from "@chakra-ui/react";
import UserRegistrationData from "@components/Registrations/UserRegistrationData";
import { FaSync } from "react-icons/fa";
import TableHeader from "@components/TableHeader";
import { AuthContext } from "@context/AuthContext";
import AdminRegistrationData from "@components/Registrations/AdminRegistrationData";
import { useData } from "@util/hooks/useData";
import TopPanel from "@components/TopPanel";

const UserRegistrations: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ registrations }) => {
    const { user, loading } = useContext(AuthContext);

    const { data, isLoading, error, refetch } = useData<
        UserRegistration[] | MSAdminRegistration[]
    >("/api/member/registrations", registrations);

    return (
        <>
            <Head>
                <title>Registrations</title>
            </Head>
            <TopPanel title={"User Registrations"} actionIcon={FaSync} actionText={"Refresh"} onActionClick={refetch} actionIsProcessing={isLoading} hasAction />
            {loading || !user ? (
                <Center w={"full"} h={"full"}>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <TableContainer maxH={"inherit"} overflowY={"auto"}>
                    <Table>
                        <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                            <Tr>
                                <TableHeader heading={"date registered"} />
                                <TableHeader
                                    heading={"full name"}
                                    subheading={"email address"}
                                    sortable
                                />
                                <TableHeader heading={"mobile #"} />
                                <TableHeader
                                    heading={
                                        [
                                            "CEAP_ADMIN",
                                            "CEAP_SUPER_ADMIN",
                                        ].includes(user.role)
                                            ? "member school"
                                            : "school id"
                                    }
                                />
                                <TableHeader heading={""} />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/** @ts-ignore */}
                            {data?.map((reg) => {
                                switch (user.role) {
                                    case AccountType.CEAP_SUPER_ADMIN:
                                    case AccountType.CEAP_ADMIN:
                                        return (
                                            <AdminRegistrationData
                                                data={
                                                    reg as MSAdminRegistration & {
                                                        memberSchool: MemberSchool;
                                                    }
                                                }
                                                key={reg.id}
                                                refresh={refetch}
                                            />
                                        );
                                    case AccountType.MS_ADMIN:
                                        return (
                                            <UserRegistrationData
                                                data={reg as UserRegistration}
                                                key={reg.id}
                                                refresh={refetch}
                                            />
                                        );
                                }
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    registrations?:
        | UserRegistration[]
        | (MSAdminRegistration & { memberSchool: MemberSchool })[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        const user = await prisma.user.findFirst({
            where: {
                authId: uid,
            },
        });

        if (!user) {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                },
            };
        }
        let registrations = undefined;

        switch (user?.accountType) {
            case AccountType.CEAP_ADMIN:
            case AccountType.CEAP_SUPER_ADMIN:
                registrations = await prisma.mSAdminRegistration.findMany({
                    include: {
                        memberSchool: true,
                    },
                });

                console.table(registrations);

                return {
                    props: {
                        registrations: registrations.map((reg) => ({
                            ...reg,
                            registeredAt: reg.registeredAt?.toString(),
                        })),
                    },
                };
            case AccountType.MS_ADMIN:
                registrations = await prisma.userRegistration.findMany({
                    where: {
                        memberSchoolId: user?.memberSchoolId,
                    },
                });

                console.table(registrations);

                return {
                    props: {
                        registrations: registrations.map((reg) => ({
                            ...reg,
                            registeredAt: reg.registeredAt?.toString(),
                            birthday: reg.birthday.toString(),
                        })),
                    },
                };
            default:
                return {
                    redirect: {
                        destination: "/",
                        statusCode: 301,
                    },
                };
        }
    }
);

UserRegistrations.PageLayout = Layout;

export default UserRegistrations;
