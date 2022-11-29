import { useContext, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";

import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import {
    CircularProgress,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Thead,
    Center,
    Td,
    Flex,
    Button,
    Text,
    Box,
} from "@chakra-ui/react";

import { FaCaretLeft, FaCaretRight, FaSync } from "react-icons/fa";

import TableHeader from "@components/TableHeader";
import { AuthContext } from "@context/AuthContext";
import TopPanel from "@components/TopPanel";

import { useData } from "@util/hooks/useData";

import { IUserRegistrationSchema, IMSAdminRegistrationSchema } from "@db/index";

const AdminRegistrationData = dynamic(
    () => import("@components/Registrations/AdminRegistrationData")
);
const UserRegistrationData = dynamic(
    () => import("@components/Registrations/UserRegistrationData")
);

import { AccountType } from "@util/Enums";

const UserRegistrations: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
    const { user, loading } = useContext(AuthContext);
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, error, refetch } = useData<IRegistrationInfo[]>(
        `/api/member/registrations?p=${page}`
    );

    const [sortKey, setSortKey] = useState<string>("datePerformed");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const sortData = (key: string) => {
        setPage(1);
        let currentDir = sortDir;
        if (key === sortKey) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
            currentDir = sortDir === "asc" ? "desc" : "asc";
        }
        setSortKey(key);

        refetch(
            `/api/member/registrations?p=${1}&sortBy=${key}&sortDir=${currentDir}`
        );
    };

    return (
        <>
            <Head>
                <title>Registrations</title>
            </Head>

            <TopPanel
                title={"User Registrations"}
                actionIcon={FaSync}
                actionText={"Refresh"}
                onActionClick={refetch}
                actionIsProcessing={isLoading}
                hasAction
            />

            <Flex align={"center"} justify={"end"}>
                <Button
                    variant={"transparent"}
                    onClick={() => {
                        refetch(`/api/member/registrations?p=${page - 1}`);
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
                        refetch(`/api/member/registrations?p=${page + 1}`);
                        setPage((p) => p + 1);
                    }}
                    disabled={isLoading || (data && data?.length < 30)}
                >
                    <Box as={FaCaretRight} color={"primary"} />
                </Button>
            </Flex>
            {loading || !user ? (
                <Center w={"full"} h={"full"}>
                    <CircularProgress isIndeterminate />
                </Center>
            ) : (
                <TableContainer maxH={"inherit"} overflowY={"auto"}>
                    <Table>
                        <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                            <Tr>
                                <TableHeader
                                    heading={"date registered"}
                                    sortable
                                    onClick={() => sortData("registeredAt")}
                                />
                                <TableHeader
                                    heading={"full name"}
                                    subheading={"email address"}
                                    sortable
                                    onClick={() => sortData("lastName")}
                                />
                                <TableHeader
                                    heading={"mobile #"}
                                    sortable
                                    onClick={() => sortData("mobileNumber")}
                                />
                                <TableHeader
                                    heading={
                                        [
                                            "CEAP_ADMIN",
                                            "CEAP_SUPER_ADMIN",
                                        ].includes(user.role)
                                            ? "member school"
                                            : "school id"
                                    }
                                    sortable
                                    onClick={() => {
                                        if (
                                            [
                                                "CEAP_ADMIN",
                                                "CEAP_SUPER_ADMIN",
                                            ].includes(user.role)
                                        ) {
                                            sortData("memberSchool.name");
                                        } else {
                                            sortData("schoolId");
                                        }
                                    }}
                                />
                                <TableHeader heading={""} />
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isLoading ? (
                                <Tr>
                                    <Td colSpan={5}>
                                        <Center>
                                            <CircularProgress
                                                isIndeterminate
                                                color={"primary"}
                                                size={8}
                                            />
                                        </Center>
                                    </Td>
                                </Tr>
                            ) : (
                                data?.map((reg) => {
                                    switch (user.role) {
                                        case AccountType.CEAP_SUPER_ADMIN:
                                        case AccountType.CEAP_ADMIN:
                                            return (
                                                <AdminRegistrationData
                                                    data={
                                                        reg as IMSAdminRegistrationSchema & {
                                                            id: string;
                                                            registeredAt: string;
                                                            memberSchool: {
                                                                id: string;
                                                                name: string;
                                                            };
                                                        }
                                                    }
                                                    key={reg.id}
                                                    refresh={refetch}
                                                />
                                            );
                                        case AccountType.MS_ADMIN:
                                            return (
                                                <UserRegistrationData
                                                    data={reg}
                                                    key={reg.id}
                                                    refresh={refetch}
                                                />
                                            );
                                    }
                                })
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export type IRegistrationInfo =
    | (IUserRegistrationSchema & {
          id: string;
          registeredAt: string;
          birthday?: string;
      })
    | (IMSAdminRegistrationSchema & {
          id: string;
          registeredAt: string;
          memberSchool: { id: string; name: string };
      });

export const getServerSideProps: GetServerSideProps =
    AuthGetServerSideProps(async () => {
        return {
            props: {},
        };
    }, [
        AccountType.MS_ADMIN,
        AccountType.CEAP_ADMIN,
        AccountType.CEAP_SUPER_ADMIN,
    ]);

UserRegistrations.PageLayout = Layout;

export default UserRegistrations;
