import { useContext, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import { AccountType, MemberSchool, User } from "@prisma/client";

import {
    CircularProgress,
    Flex,
    Center,
    Table,
    TableContainer,
    Thead,
    Tr,
    Tbody,
    Td,
    Box,
    Button,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import { prisma } from "prisma/db";

import { PageWithLayout } from "./_app";

import { AuthContext } from "@context/AuthContext";

import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";
import TableHeader from "@components/TableHeader";
import UserData from "@components/Accounts/UserData";
import TabButton from "@components/Accounts/TabButton";

import { useData } from "@util/hooks/useData";
import SearchBar from "@components/Accounts/SearchBar";
import { FaSearch, FaPlus } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import EditUserModal from "@components/Accounts/EditUserModal";
import axios from "axios";
import ConfirmationModal from "@components/ConfirmationModal";

// TODO: Add accepted roles for every GetServersideProps page if applicable

const ManageAccounts: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ accounts }) => {
    const toast = useToast();
    const [current, setCurrent] = useState<"admin" | "user">("admin");
    const { user, loading } = useContext(AuthContext);
    const { data, isLoading, refetch } = useData("", accounts);

    const {
        isOpen: openEditUser,
        onClose: closeEditUser,
        onOpen: showEditUserModal,
    } = useDisclosure();

    const {
        isOpen: openDeleteConfirmation,
        onClose: hideDeleteConfirmation,
        onOpen: showDeleteConfirmation,
    } = useDisclosure();

    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    const deleteUser = () => {
        axios
            .post("/api/member/delete", { id: currentUser?.id })
            .then(() => {
                toast({
                    title: "User Deleted Successfully.",
                    status: "success",
                });
                refetch(`/api/member/${current}`);
                hideDeleteConfirmation();
            })
            .catch(() => {
                toast({ title: "Error In Deleting User.", status: "error" });
                hideDeleteConfirmation();
            });
    };

    const showEditModal = (id: string) => {
        let targetUser = data?.find((u) => u.id === id);
        setCurrentUser(targetUser);
        showEditUserModal();
    };

    return (
        <>
            <Head>
                <title>Manage Accounts</title>
            </Head>
            <TopPanel title={"Manage Accounts"} />
            {user && !loading ? (
                <>
                    <Flex justify={"space-between"} align={"center"}>
                        <Flex
                            justify={"flex-start"}
                            align={"center"}
                            m={"2"}
                            w={"full"}
                        >
                            <TabButton
                                onClick={() => {
                                    setCurrent("admin");
                                    refetch("/api/member/admin");
                                }}
                                isActive={current === "admin"}
                            >
                                Admins
                            </TabButton>
                            <TabButton
                                onClick={() => {
                                    setCurrent("user");
                                    refetch("/api/member/users");
                                }}
                                isActive={current === "user"}
                            >
                                Users
                            </TabButton>
                        </Flex>
                        <Flex justify={"flex-end"} align={"stretch"}>
                            <SearchBar />
                            <Tooltip
                                label={"Search"}
                                placement={"bottom"}
                                hasArrow
                            >
                                <Center px={"4"}>
                                    <Button
                                        w={"full"}
                                        _hover={{ color: "secondary" }}
                                        bg={"transparent"}
                                        color={"neutralizerDark"}
                                    >
                                        <Box
                                            as={FaSearch}
                                            m={"auto"}
                                            cursor={"pointer"}
                                            fontSize={"2xl"}
                                        />
                                    </Button>
                                </Center>
                            </Tooltip>
                        </Flex>
                    </Flex>
                    <TableContainer maxH={"inherit"} overflowY={"auto"}>
                        <Table>
                            <Thead
                                bg={"gray.100"}
                                position={"sticky"}
                                top={"0"}
                            >
                                <Tr>
                                    <TableHeader
                                        heading={"full name"}
                                        subheading={"email address"}
                                        sortable
                                    />
                                    <TableHeader heading={"mobile #"} />
                                    <TableHeader heading={"school id"} />
                                    <TableHeader heading="" />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.map((account) => (
                                    <UserData
                                        user={account}
                                        key={account.id}
                                        onDelete={(id: string) => {
                                            showDeleteConfirmation();
                                            let currentUser = data.find(
                                                (u) => u.id === id
                                            );
                                            setCurrentUser(currentUser);
                                        }}
                                        showEdit={(id: string) =>
                                            showEditModal(id)
                                        }
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
                </>
            ) : (
                <Center h={"full"} w={"full"}>
                    <CircularProgress isIndeterminate color={"secondary"} />
                </Center>
            )}
            <AnimatePresence>
                {openEditUser && currentUser && (
                    <EditUserModal
                        user={currentUser}
                        accountTypes={[
                            AccountType.MS_ADMIN,
                            AccountType.MS_USER,
                        ]}
                        onClose={() => {
                            setCurrentUser(undefined);
                            closeEditUser();
                            refetch(`/api/member/${current}`);
                        }}
                        hasSchoolId
                    />
                )}
                {openDeleteConfirmation && currentUser && (
                    <ConfirmationModal
                        title={"Delete User"}
                        prompt={`Are you sure you want to delete ${currentUser.displayName}'s account?`}
                        rejectText={"Cancel"}
                        acceptText={"Confirm"}
                        onReject={() => {
                            setCurrentUser(undefined);
                            hideDeleteConfirmation();
                        }}
                        onAccept={() => deleteUser()}
                        willProcessOnAccept
                    />
                )}
            </AnimatePresence>
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

            accounts = await prisma.user.findMany({
                where: {
                    accountType: AccountType.MS_ADMIN,
                    memberSchoolId: admin.memberSchoolId,
                    AND: {
                        authId: {
                            not: uid,
                        },
                    },
                },
            });
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
