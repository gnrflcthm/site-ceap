import { useContext } from "react";

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
} from "@chakra-ui/react";

import { FaSync } from "react-icons/fa";

import TableHeader from "@components/TableHeader";
import { AuthContext } from "@context/AuthContext";
import TopPanel from "@components/TopPanel";

import { useData } from "@util/hooks/useData";

import {
    connectDB,
    IUserRegistrationSchema,
    IMSAdminRegistrationSchema,
    User,
    MSAdminRegistration,
    UserRegistration,
} from "@db/index";

const AdminRegistrationData = dynamic(
    () => import("@components/Registrations/AdminRegistrationData")
);
const UserRegistrationData = dynamic(
    () => import("@components/Registrations/UserRegistrationData")
);

import { AccountType } from "@util/Enums";

const UserRegistrations: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ registrations }) => {
    const { user, loading } = useContext(AuthContext);

    const { data, isLoading, error, refetch } = useData<
        | (IUserRegistrationSchema & {
              id: string;
              registeredAt: string;
              birthday?: string;
          })[]
        | (IMSAdminRegistrationSchema & {
              id: string;
              registeredAt: string;
              memberSchool: { id: string; name: string };
          })[]
    >("/api/member/registrations", registrations);

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

export const getServerSideProps: GetServerSideProps<{
    registrations?:
        | (IUserRegistrationSchema & {
              id: string;
              registeredAt: string;
              birthday?: string;
          })[]
        | (IMSAdminRegistrationSchema & {
              id: string;
              registeredAt: string;
              memberSchool: { id: string; name: string };
          })[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        await connectDB();

        const user = await User.findOne({ authId: uid });

        if (!user) {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                },
            };
        }

        let registrations = [];

        switch (user.accountType) {
            case AccountType.CEAP_ADMIN:
            case AccountType.CEAP_SUPER_ADMIN:
                registrations = await MSAdminRegistration.find()
                    .populate("memberSchool", ["id", "name"])
                    .exec();

                return {
                    props: {
                        registrations: registrations.map((reg) => ({
                            ...reg.toJSON(),
                            registeredAt: reg.registeredAt.toDateString(),
                        })),
                    },
                };
            case AccountType.MS_ADMIN:
                registrations = await UserRegistration.find({
                    memberSchool: user?.memberSchool,
                })
                    .populate("memberSchool", ["id", "name"])
                    .exec();

                return {
                    props: {
                        registrations: registrations.map((reg) => ({
                            ...reg.toJSON(),
                            birthday: reg.birthday?.toDateString() || "",
                            registeredAt: reg.registeredAt.toDateString(),
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
