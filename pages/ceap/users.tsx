import { FormEvent, useContext, useState } from "react";

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
} from "@chakra-ui/react";

import { PageWithLayout } from "../_app";

import Layout from "@components/Layout";
import { AuthContext } from "@context/AuthContext";
import TopPanel from "@components/TopPanel";
import TableHeader from "@components/TableHeader";
import UserData from "@components/Accounts/UserData";
import TabButton from "@components/Accounts/TabButton";

import { useData } from "@util/hooks/useData";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import SearchBar from "@components/SearchBar";
import AddAdminPopup from "@components/Accounts/AddAdminPopup";
import { AnimatePresence, motion } from "framer-motion";
import EditUserModal from "@components/Accounts/EditUserModal";
import axios, { AxiosError } from "axios";
import ConfirmationModal from "@components/ConfirmationModal";
import { connectDB, IUserSchema, User } from "@db/index";
import { AccountType } from "@util/Enums";

const CEAPUsers: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ accounts }) => {
    const toast = useToast();
    const [current, setCurrent] = useState<"ceap" | "admin" | "none">("ceap");

    const [query, setQuery] = useState<string>("");
    const [criteria, setCriteria] = useState<string>("");

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

    const {
        isOpen: openDeleteConfirmation,
        onClose: hideDeleteConfirmation,
        onOpen: showDeleteConfirmation,
    } = useDisclosure();

    const { user, loading } = useContext(AuthContext);
    const { data, isLoading, refetch } = useData("", accounts);
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
            .catch((err: AxiosError) => {
                toast({
                    title:
                        err.response?.statusText || "Error In Deleting User.",
                    status: "error",
                });
                hideDeleteConfirmation();
            });
    };

    const searchUsers = (e: FormEvent) => {
        e.preventDefault();
        setCurrent("none");
        refetch(`/api/admin/users?${criteria}=${query}`);
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
                                <Select
                                    required
                                    onChange={(e) => {
                                        setCriteria(e.target.value);
                                        setQuery("");
                                    }}
                                >
                                    <option selected disabled>
                                        Search Critieria
                                    </option>
                                    <option value="name">Name</option>
                                    <option value="mobile">
                                        Mobile Number
                                    </option>
                                    <option value="email">Email Address</option>
                                    <option value="accountType">
                                        Account Type
                                    </option>
                                    <option value="school">School</option>
                                </Select>
                                {criteria === "accountType" ? (
                                    <Select
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                    >
                                        <option value={AccountType.CEAP_ADMIN}>
                                            CEAP Admin
                                        </option>
                                        <option
                                            value={AccountType.CEAP_SUPER_ADMIN}
                                        >
                                            CEAP Super Admin
                                        </option>
                                        <option value={AccountType.MS_ADMIN}>
                                            Member School Admin
                                        </option>
                                    </Select>
                                ) : (
                                    <SearchBar
                                        query={query}
                                        setQuery={setQuery}
                                        placeholder={"Search..."}
                                        inputColor={"neutralizerDark"}
                                        hasForm={true}
                                    />
                                )}
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
                                        onDelete={(id: string) => {
                                            showDeleteConfirmation();
                                            let currentUser = data.find(
                                                (u) => u.id === id
                                            );
                                            setCurrentUser(currentUser);
                                        }}
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
                        <AddAdminPopup
                            hideForm={() => {
                                refetch("/api/member/ceap");
                                closeCreateAdmin();
                            }}
                        />
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
                        onSave={() => {
                            setCurrentUser(undefined);
                            closeEditUser();
                            refetch(`/api/member/${current}`);
                        }}
                        onCancel={() => {
                            setCurrentUser(undefined);
                            closeEditUser();
                        }}
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
        memberSchool?: { id: string; name: string };
    })[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        await connectDB();

        const accounts = await User.find(
            {
                accountType: [
                    AccountType.CEAP_ADMIN,
                    AccountType.CEAP_SUPER_ADMIN,
                ],
                authId: {
                    $ne: uid,
                },
            },
            {},
            {
                fields: [
                    "id",
                    "firstName",
                    "lastName",
                    "middleName",
                    "email",
                    "mobileNumber",
                    "accountType",
                ],
            }
        )
            .populate("memberSchool", ["id", "name"])
            .exec();

        return {
            props: {
                accounts: accounts.map((account) => account.toJSON()),
            },
        };
    }
);

CEAPUsers.PageLayout = Layout;

export default CEAPUsers;
