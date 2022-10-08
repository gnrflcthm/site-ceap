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

import { PageWithLayout } from "../_app";

import Layout from "@components/Layout";
import { AuthContext } from "@context/AuthContext";
import TopPanel from "@components/TopPanel";
import TableHeader from "@components/TableHeader";
import UserData from "@components/Accounts/UserData";
import TabButton from "@components/Accounts/TabButton";

import { useData } from "@util/hooks/useData";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import SearchBar from "@components/Accounts/SearchBar";
import AddAdminPopup from "@components/Accounts/AddAdminPopup";
import { AnimatePresence, motion } from "framer-motion";
import EditUserModal from "@components/Accounts/EditUserModal";
import axios from "axios";

const CEAPUsers: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ accounts }) => {
    const toast = useToast();
    const [current, setCurrent] = useState<"ceap" | "admin">("ceap");
    const {
        isOpen: openCreateAdmin,
        onToggle: toggleCreateAdmin,
        onClose: closeCreateAdmin,
    } = useDisclosure();
    const {
        isOpen: openEditUser,
        onClose: closeEditUser,
        onOpen: showEditUser,
    } = useDisclosure();
    const { user, loading } = useContext(AuthContext);
    const { data, isLoading, refetch } = useData("", accounts);
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    const deleteUser = (id: string) => {
        axios
            .post("/api/member/delete", { id })
            .then(() => {
                toast({
                    title: "User Deleted Successfully.",
                    status: "success",
                });
                refetch(`/api/member/${current}`);
            })
            .catch(() =>
                toast({ title: "Error In Deleting User.", status: "error" })
            );
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
                                    setCurrent("ceap");
                                    refetch("/api/member/ceap");
                                }}
                                isActive={current === "ceap"}
                            >
                                CEAP
                            </TabButton>
                            <TabButton
                                onClick={() => {
                                    setCurrent("admin");
                                    refetch("/api/member/admin");
                                    closeCreateAdmin();
                                }}
                                isActive={current === "admin"}
                            >
                                Member Schools
                            </TabButton>
                        </Flex>
                        <Flex
                            justify={
                                current === "ceap"
                                    ? "space-between"
                                    : "flex-end"
                            }
                            align={"stretch"}
                            w={"40%"}
                        >
                            <Flex>
                                {/* TODO: Add Search Functionality */}
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
                            {current === "ceap" && (
                                <Tooltip
                                    label={"Create Admin"}
                                    placement={"bottom"}
                                    hasArrow
                                >
                                    <Center px={"4"}>
                                        <Button
                                            w={"full"}
                                            _hover={{ color: "secondary" }}
                                            bg={"transparent"}
                                            color={"neutralizerDark"}
                                            onClick={() => toggleCreateAdmin()}
                                        >
                                            <Box
                                                as={
                                                    openCreateAdmin
                                                        ? FaTimes
                                                        : FaPlus
                                                }
                                                m={"auto"}
                                                cursor={"pointer"}
                                                fontSize={"2xl"}
                                            />
                                        </Button>
                                    </Center>
                                </Tooltip>
                            )}
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
                                    <TableHeader heading={"account type"} />
                                    <TableHeader heading={"member school"} />
                                    <TableHeader heading="" />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.map((account) => (
                                    <UserData
                                        user={account}
                                        key={account.id}
                                        onDelete={(id: string) =>
                                            deleteUser(id)
                                        }
                                        showEdit={(id: string) => {
                                            let targetUser = data.find(
                                                (u) => u.id === id
                                            );
                                            setCurrentUser(targetUser);
                                            showEditUser();
                                        }}
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
                {openCreateAdmin && (
                    <Box
                        as={motion.div}
                        pos={"fixed"}
                        zIndex={"popover"}
                        right={"2"}
                        bottom={"2"}
                        initial={{
                            y: 250,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                            },
                        }}
                        exit={{
                            y: 250,
                            opacity: 0,
                            transition: {
                                duration: 0.5,
                            },
                        }}
                    >
                        <AddAdminPopup hideForm={() => closeCreateAdmin()} />
                    </Box>
                )}
                {openEditUser && currentUser && (
                    <EditUserModal
                        user={currentUser}
                        accountTypes={
                            current === "ceap"
                                ? [
                                      AccountType.CEAP_ADMIN,
                                      AccountType.CEAP_SUPER_ADMIN,
                                  ]
                                : [AccountType.MS_ADMIN, AccountType.MS_USER]
                        }
                        onClose={() => {
                            setCurrentUser(undefined);
                            closeEditUser();
                            refetch(`/api/member/${current}`);
                        }}
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
            accounts = await prisma.user.findMany({
                where: {
                    accountType: {
                        in: [
                            AccountType.CEAP_ADMIN,
                            AccountType.CEAP_SUPER_ADMIN,
                        ],
                    },
                    authId: {
                        not: uid,
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

CEAPUsers.PageLayout = Layout;

export default CEAPUsers;
