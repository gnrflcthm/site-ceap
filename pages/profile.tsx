import { useState, createContext } from "react";
import { PageWithLayout } from "./_app";

import Head from "next/head";

import UserInfo from "@components/Profile/UserInfo";

import {
    VStack,
    Heading,
    Divider,
    SimpleGrid,
    Flex,
    Button,
    Stack,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Box,
    Center,
    CircularProgress,
} from "@chakra-ui/react";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import axios, { AxiosError } from "axios";
import UpdatePasswordModal from "@components/Profile/UpdatePasswordModal";
import TopPanel from "@components/TopPanel";
import { connectDB, IUserSchema, User } from "@db/index";
import { FaCog } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import EditUserModal from "@components/Accounts/EditUserModal";
import { useData } from "@util/hooks/useData";

const Profile: PageWithLayout = () => {
    const {
        data: userData,
        isLoading,
        refetch,
    } = useData<
        IUserSchema & {
            id: string;
            memberSchool: { id: string; name: string };
        }
    >("/api/user/profile");

    const {
        isOpen: showPass,
        onClose: closePass,
        onOpen: openPass,
    } = useDisclosure();

    const {
        isOpen: showEdit,
        onClose: closeEdit,
        onOpen: openEdit,
    } = useDisclosure();

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <TopPanel title={"Profile"} />
            <VStack align={"flex-start"} p={"4"}>
                <Flex justify={"space-between"} align={"center"} w={"full"}>
                    <Heading fontSize={{ base: "lg", lg: "2xl" }}>
                        User Information
                    </Heading>
                    <Menu>
                        <MenuButton
                            color={"neutralizerDark"}
                            _hover={{ color: "secondary" }}
                        >
                            <Box
                                as={FaCog}
                                color={"inherit"}
                                fontSize={"2xl"}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => openEdit()}>
                                Edit Info
                            </MenuItem>
                            <MenuItem onClick={() => openPass()}>
                                Update Password
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Divider borderColor={"neutralizerDark"} />
                {isLoading && !userData ? (
                    <Center w={"full"} p={"8"}>
                        <CircularProgress
                            isIndeterminate
                            size={"8"}
                            color={"secondary"}
                        />
                    </Center>
                ) : (
                    <SimpleGrid
                        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                        gridAutoFlow={"row"}
                        w={"full"}
                        spacingX={"10"}
                        spacingY={"4"}
                    >
                        <UserInfo
                            label={"First Name"}
                            value={userData?.firstName}
                        />
                        <UserInfo
                            label={"Last Name"}
                            value={userData?.lastName}
                        />
                        <UserInfo
                            label={"Middle Name"}
                            value={userData?.middleName || ""}
                        />
                        <UserInfo
                            label={"Display Name"}
                            value={userData?.displayName || ""}
                        />
                        <UserInfo
                            label={"Email"}
                            value={`${userData?.email}`}
                        />
                        <UserInfo
                            label={"Contact No."}
                            value={`${userData?.mobileNumber || "N/A"}`}
                        />
                        <UserInfo
                            label={"Member School"}
                            value={`${userData?.memberSchool?.name || "N/A"}`}
                        />
                    </SimpleGrid>
                )}
            </VStack>
            <AnimatePresence>
                {showPass && (
                    <UpdatePasswordModal
                        email={userData?.email}
                        onDismiss={closePass}
                    />
                )}
                {showEdit && (
                    <EditUserModal
                        user={userData!}
                        onCancel={() => closeEdit()}
                        onSave={() => {
                            refetch();
                            closeEdit();
                        }}
                        hasSchoolId={true}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        return { props: {} };
    }
);

Profile.PageLayout = Layout;

export default Profile;
