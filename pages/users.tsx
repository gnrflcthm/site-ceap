import { FormEvent, useContext, useState, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

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
    Select,
    Text,
} from "@chakra-ui/react";

import { PageWithLayout } from "./_app";

import { AuthContext } from "@context/AuthContext";

import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";
import TableHeader from "@components/TableHeader";
import UserData from "@components/Accounts/UserData";
import TabButton from "@components/Accounts/TabButton";

import { useData } from "@util/hooks/useData";
import { FaCaretLeft, FaCaretRight, FaSearch } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import EditUserModal from "@components/Accounts/EditUserModal";
import axios from "axios";
import ConfirmationModal from "@components/ConfirmationModal";

import { AccountType } from "@util/Enums";
import { IUserSchema, connectDB, User } from "@db/index";
import SearchBar from "@components/SearchBar";

// TODO: Add accepted roles for every GetServersideProps page if applicable

const ManageAccounts: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ accounts }) => {
    const toast = useToast();
    const [current, setCurrent] = useState<"admin" | "users" | "none">("admin");
    const { user, loading } = useContext(AuthContext);
    const { data, isLoading, refetch } = useData("", accounts);

    const [query, setQuery] = useState<string>("");
    // const [criteria, setCriteria] = useState<string>("name");

    const [page, setPage] = useState<number>(1);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const [sortKey, setSortKey] = useState<string>("lastName");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

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

    const [currentUser, setCurrentUser] = useState<
        | (IUserSchema & {
              id: string;
              memberSchool?: { id: string; name: string };
          })
        | undefined
    >(undefined);

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

    const searchUsers = (e: FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setPage(1);
        setCurrent("none");
        refetch(`/api/admin/users?q=${query}`);
    };

    const sortData = (key: string) => {
        setPage(1);
        if (sortKey === key) {
            setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
        }
        if (isSearching) {
            refetch(
                `/api/admin/users?q=${query}&p=${page}&sortBy=${sortKey}&sortDir=${sortDir}`
            );
        } else {
            refetch(
                `/api/member/${current}?p=${page}&sortBy=${sortKey}&sortDir=${sortDir}`
            );
        }
    };

    return (
        <>
            <Head>
                <title>Manage Accounts</title>
            </Head>
            <TopPanel title={"Manage Accounts"} />
            {user && !loading ? (
                <>
                    <Flex
                        flexDir={{ base: "column", md: "row" }}
                        justify={"space-between"}
                        align={{ base: "stretch", md: "center" }}
                    >
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
                                    setPage(1);
                                    setQuery("");
                                    setIsSearching(false);
                                }}
                                isActive={current === "admin"}
                            >
                                Admins
                            </TabButton>
                            <TabButton
                                onClick={() => {
                                    setCurrent("users");
                                    refetch("/api/member/users");
                                    setPage(1);
                                    setQuery("");
                                    setIsSearching(false);
                                }}
                                isActive={current === "users"}
                            >
                                Users
                            </TabButton>
                        </Flex>
                        <Flex
                            w={"full"}
                            as={"form"}
                            onSubmit={searchUsers}
                            px={"2"}
                            justify={{ base: "center", md: "flex-end" }}
                        >
                            <SearchBar
                                query={query}
                                setQuery={setQuery}
                                placeholder={"Search..."}
                                inputColor={"neutralizerDark"}
                                hasForm={true}
                                showIcon={false}
                            />

                            <Tooltip
                                label={"Search"}
                                placement={"bottom"}
                                hasArrow
                            >
                                <Center px={"1"}>
                                    <Button
                                        w={"full"}
                                        _hover={{ color: "secondary" }}
                                        bg={"transparent"}
                                        color={"neutralizerDark"}
                                        type={"submit"}
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
                    <Flex align={"center"} justify={"end"}>
                        <Button
                            variant={"transparent"}
                            onClick={() => {
                                if (isSearching) {
                                    refetch(
                                        `/api/admin/users?q=${query}&p=${
                                            page - 1
                                        }&sortBy=${sortKey}&sortDir=${sortDir}`
                                    );
                                } else {
                                    refetch(
                                        `/api/member/${current}?p=${
                                            page - 1
                                        }&sortBy=${sortKey}&sortDir=${sortDir}`
                                    );
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
                                        `/api/admin/users?q=${query}&p=${
                                            page + 1
                                        }&sortBy=${sortKey}&sortDir=${sortDir}`
                                    );
                                } else {
                                    refetch(
                                        `/api/member/${current}?p=${
                                            page + 1
                                        }&sortBy=${sortKey}&sortDir=${sortDir}`
                                    );
                                }
                                setPage((p) => p + 1);
                            }}
                            disabled={isLoading || (data && data?.length < 30)}
                        >
                            <Box as={FaCaretRight} color={"primary"} />
                        </Button>
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
                                        onClick={() => sortData("lastName")}
                                    />
                                    <TableHeader
                                        heading={"mobile #"}
                                        sortable
                                        onClick={() => sortData("mobileNumber")}
                                    />
                                    <TableHeader
                                        heading={"school id"}
                                        sortable
                                        onClick={() => sortData("schoolId")}
                                    />
                                    <TableHeader heading="" />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(() => {
                                    if (data && data.length > 0) {
                                        return data?.map((account) => (
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
                                        ));
                                    }

                                    return (
                                        <Tr>
                                            <Td colSpan={5}>
                                                <Center h={"full"} w={"full"}>
                                                    {isLoading ? (
                                                        <CircularProgress
                                                            isIndeterminate
                                                            color={"secondary"}
                                                        />
                                                    ) : (
                                                        <Text>
                                                            No Users Found
                                                        </Text>
                                                    )}
                                                </Center>
                                            </Td>
                                        </Tr>
                                    );
                                })()}
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
                        onSave={() => {
                            setCurrentUser(undefined);
                            closeEditUser();
                            refetch(`/api/member/${current}`);
                        }}
                        onCancel={() => {
                            setCurrentUser(undefined);
                            closeEditUser();
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
    accounts?: (IUserSchema & {
        id: string;
        memberSchool: { id: string; name: string };
    })[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        await connectDB();

        const admin = await User.findOne({ authId: uid });

        if (!admin) {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                    permanent: false,
                },
            };
        }

        const accounts = await User.find({
            accountType: AccountType.MS_ADMIN,
            memberSchool: admin.memberSchool,
            authId: {
                $ne: uid,
            },
        })
            .populate("memberSchool", ["id", "name"])
            .exec();

        return {
            props: {
                accounts: accounts.map((account) => account.toJSON()),
            },
        };
    }
);

ManageAccounts.PageLayout = Layout;

export default ManageAccounts;
