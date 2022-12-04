import { FormEvent, useContext, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import AuthGetServerSideProps from "@util/api/authGSSP";

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
    Text,
} from "@chakra-ui/react";

import { PageWithLayout } from "../_app";

import Layout from "@components/Layout";
import { AuthContext } from "@context/AuthContext";
import TopPanel from "@components/TopPanel";
import TableHeader from "@components/TableHeader";
import UserData from "@components/Accounts/UserData";
import TabButton from "@components/Accounts/TabButton";

import { useData } from "@util/hooks/useData";
import {
    FaCaretLeft,
    FaCaretRight,
    FaDownload,
    FaPlus,
    FaSearch,
    FaTimes,
} from "react-icons/fa";
import SearchBar from "@components/SearchBar";
import AddAdminPopup from "@components/Accounts/AddAdminPopup";
import { AnimatePresence, motion } from "framer-motion";
import EditUserModal from "@components/Accounts/EditUserModal";
import axios, { AxiosError } from "axios";
import ConfirmationModal from "@components/ConfirmationModal";
import { connectDB, IMemberSchoolSchema, IUserSchema, User } from "@db/index";
import { AccountType } from "@util/Enums";
import DeleteRejectPrompt from "@components/Accounts/DeleteRejectPrompt";

const CEAPUsers: PageWithLayout = () => {
    const toast = useToast();
    const [current, setCurrent] = useState<"ceap" | "admin" | "none">("ceap");

    const [query, setQuery] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const [sortKey, setSortKey] = useState<string>("lastName");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    const [generatingMSReport, setGeneratingMSReport] =
        useState<boolean>(false);

    const {
        isOpen: openCreateAdmin,
        onToggle: toggleCreateAdmin,
        onClose: closeCreateAdmin,
    } = useDisclosure();

    const {
        isOpen: openDeleteConfirmation,
        onClose: hideDeleteConfirmation,
        onOpen: showDeleteConfirmation,
    } = useDisclosure();

    const {
        isOpen: openRoleConfirmation,
        onClose: closeRoleConfirmation,
        onOpen: showRoleConfirmation,
    } = useDisclosure();

    const { user, loading } = useContext(AuthContext);
    const { data, isLoading, refetch } = useData<
        (IUserSchema & {
            _id: string;
            memberSchool: IMemberSchoolSchema & { _id: string };
        })[]
    >("/api/member/ceap");

    const [currentUser, setCurrentUser] = useState<
        | (IUserSchema & {
              _id: string;
              memberSchool: IMemberSchoolSchema & { _id: string };
          })
        | undefined
    >(undefined);

    const deleteUser = (reason: string) => {
        axios
            .post("/api/member/delete", { id: currentUser?._id, reason })
            .then(() => {
                toast({
                    title: "User Deleted Successfully.",
                    status: "success",
                });
                refetch(`/api/member/${current}`);
                hideDeleteConfirmation();
            })
            .catch((err: AxiosError) => {
                toast({
                    title:
                        err.response?.statusText || "Error In Deleting User.",
                    status: "error",
                });
                hideDeleteConfirmation();
            });
    };

    const updateRole = (id: string) => {
        axios
            .post("/api/member/updaterole", { id })
            .then((res) => {
                toast({
                    title: `Sucessfully ${res.data.action} User.`,
                    status: "success",
                });
                refetch(`/api/member/${current}`);
            })
            .catch((err: AxiosError) => {
                toast({
                    title:
                        err.response?.statusText ||
                        "Error In Updating User Account Type.",
                    status: "error",
                });
            })
            .finally(() => {
                closeRoleConfirmation();
                setCurrentUser(undefined);
            });
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
        let currentDir = sortDir;
        if (key === sortKey) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
            currentDir = sortDir === "asc" ? "desc" : "asc";
        }
        setSortKey(key);
        if (isSearching) {
            refetch(
                `/api/admin/users?q=${query}&p=${page}&sortBy=${key}&sortDir=${currentDir}`
            );
        } else {
            refetch(
                `/api/member/${current}?p=${page}&sortBy=${key}&sortDir=${currentDir}`
            );
        }
    };

    const generateMsReport = () => {
        setGeneratingMSReport(true);

        axios
            .get("/api/admin/msreport", { responseType: "blob" })
            .then((res) => {
                const href = URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = href;
                link.setAttribute("download", res.statusText);
                link.click();
                toast({
                    title: "Your download will begin shortly",
                    status: "info",
                });
                setGeneratingMSReport(false);
            })
            .catch((err: AxiosError) => {
                console.log(err);
                setGeneratingMSReport(false);
            });
    };

    return (
        <>
            <Head>
                <title>Manage Accounts</title>
            </Head>
            <TopPanel
                title={"Manage Accounts"}
                hasAction={current === "admin"}
                actionText={"Export"}
                actionIcon={FaDownload}
                onActionClick={() => generateMsReport()}
                actionIsProcessing={generatingMSReport}
            />
            {user && !loading ? (
                <>
                    <Flex
                        w={"full"}
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
                                    setCurrent("ceap");
                                    refetch("/api/member/ceap");
                                    setPage(1);
                                    setIsSearching(false);
                                    setQuery("");
                                }}
                                isActive={current === "ceap"}
                            >
                                CEAP
                            </TabButton>
                            <TabButton
                                onClick={() => {
                                    setCurrent("admin");
                                    refetch("/api/member/admin");
                                    setPage(1);
                                    setIsSearching(false);
                                    setQuery("");
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
                            w={{ base: "full", md: "70%" }}
                        >
                            {current === "ceap" && (
                                <Tooltip
                                    label={"Create Admin"}
                                    placement={"bottom"}
                                    hasArrow
                                >
                                    <Center px={"1"}>
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
                            <Flex
                                w={"full"}
                                as={"form"}
                                onSubmit={searchUsers}
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
                                    <Center px={"4"}>
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
                                        heading={"account type"}
                                        sortable
                                        onClick={() => sortData("accountType")}
                                    />
                                    <TableHeader
                                        heading={"member school"}
                                        sortable
                                        onClick={() =>
                                            sortData("memberSchool.name")
                                        }
                                    />
                                    <TableHeader heading="" />
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(() => {
                                    if (data) {
                                        if (data.length === 0) {
                                            return (
                                                <Tr>
                                                    <Td colSpan={5}>
                                                        <Center
                                                            h={"full"}
                                                            w={"full"}
                                                        >
                                                            <Text>
                                                                No Users Found
                                                            </Text>
                                                        </Center>
                                                    </Td>
                                                </Tr>
                                            );
                                        }
                                        return data?.map((account) => (
                                            <UserData
                                                user={account}
                                                key={account._id}
                                                onDelete={(id: string) => {
                                                    showDeleteConfirmation();
                                                    let currentUser = data.find(
                                                        (u) => u._id === id
                                                    );
                                                    setCurrentUser(currentUser);
                                                }}
                                                onChangeAccountType={(
                                                    id: string
                                                ) => {
                                                    let targetUser = data.find(
                                                        (u) => u._id === id
                                                    );
                                                    setCurrentUser(targetUser);
                                                    showRoleConfirmation();
                                                }}
                                            />
                                        ));
                                    }
                                    if (isLoading) {
                                        return (
                                            <Tr>
                                                <Td colSpan={5}>
                                                    <Center
                                                        h={"full"}
                                                        w={"full"}
                                                    >
                                                        <CircularProgress
                                                            isIndeterminate
                                                            color={"secondary"}
                                                        />
                                                    </Center>
                                                </Td>
                                            </Tr>
                                        );
                                    } else {
                                        return (
                                            <Tr>
                                                <Td colSpan={5}>
                                                    <Center
                                                        h={"full"}
                                                        w={"full"}
                                                    >
                                                        <Text>
                                                            No Users Found
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
                        <AddAdminPopup
                            hideForm={() => {
                                refetch("/api/member/ceap");
                                closeCreateAdmin();
                            }}
                        />
                    </Box>
                )}
                {openRoleConfirmation && currentUser && (
                    <ConfirmationModal
                        title={`${
                            [
                                AccountType.MS_ADMIN,
                                AccountType.CEAP_SUPER_ADMIN,
                            ].includes(currentUser.accountType)
                                ? "Demote"
                                : "Promote"
                        } User`}
                        prompt={`Are you sure you want to ${
                            [
                                AccountType.MS_ADMIN,
                                AccountType.CEAP_SUPER_ADMIN,
                            ].includes(currentUser.accountType)
                                ? "Demote"
                                : "Promote"
                        } ${currentUser.displayName}'s account?`}
                        rejectText={"Cancel"}
                        acceptText={"Confirm"}
                        onReject={() => {
                            setCurrentUser(undefined);
                            closeRoleConfirmation();
                        }}
                        onAccept={() => updateRole(currentUser._id)}
                        willProcessOnAccept
                    />
                )}
                {openDeleteConfirmation && currentUser && (
                    // <ConfirmationModal
                    //     title={"Delete User"}
                    //     prompt={`Are you sure you want to delete ${currentUser.displayName}'s account?`}
                    //     rejectText={"Cancel"}
                    //     acceptText={"Confirm"}
                    //     onReject={() => {
                    //         setCurrentUser(undefined);
                    //         hideDeleteConfirmation();
                    //     }}
                    //     onAccept={() => deleteUser()}
                    //     willProcessOnAccept
                    // />
                    <DeleteRejectPrompt
                        action="delete"
                        confirmText="Delete"
                        title="Delete User"
                        prompt={`Are you sure you want to delete ${currentUser.displayName}'s account?`}
                        onDismiss={() => {
                            setCurrentUser(undefined);
                            hideDeleteConfirmation();
                        }}
                        onConfirm={deleteUser}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export type IAdminInfo = IUserSchema & {
    _id: string;
    memberSchool?: { _id: string; name: string };
};

export const getServerSideProps: GetServerSideProps =
    AuthGetServerSideProps(async () => {
        return {
            props: {},
        };
    }, [AccountType.CEAP_SUPER_ADMIN]);

CEAPUsers.PageLayout = Layout;

export default CEAPUsers;
