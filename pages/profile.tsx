import { useContext, useState, createContext } from "react";
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
    CircularProgress,
    Text,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
} from "@chakra-ui/react";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { MemberSchool, User } from "@prisma/client";
import { prisma } from "../prisma/db";
import { AuthContext } from "@context/AuthContext";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@util/api/userInfo";
import axios, { AxiosError } from "axios";
import UpdatePasswordModal from "@components/Profile/UpdatePasswordModal";

export const ProfileModeContext = createContext<[boolean, Function]>([
    false,
    () => {},
]);

const Profile: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userInfo }) => {
    const { user } = useContext(AuthContext);
    const { data } = useQuery<
        | (User & { memberSchool: MemberSchool | undefined | null })
        | undefined
        | null
    >(["userInfo"], getUserInfo, {
        initialData: userInfo,
        staleTime: 30 * 24 * 60 * 60 * 1000,
        initialDataUpdatedAt: Date.now(),
    });

    const [updating, setUpdating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [showUpdatePassword, setShowUpdatePassword] =
        useState<boolean>(false);

    const [displayName, setDisplayName] = useState<string>(
        data?.displayName || ""
    );

    const save = () => {
        setLoading(true);
        axios
            .post("/api/user/update", {
                displayName /* Add more fields according to updateable fields */,
            })
            .then((res) => {})
            .catch((err: AxiosError) => {
                console.log(err.response?.statusText);
            })
            .finally(() => {
                setUpdating(false);
                setLoading(false);
            });
    };

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <VStack
                align={"stretch"}
                spacing={"2"}
                flex={"1"}
                position={"relative"}
                overflow={"hidden"}
                overflowY={"auto"}
            >
                <Flex
                    position={"sticky"}
                    top={"0"}
                    bg={"secondary"}
                    p={"4"}
                    align={"center"}
                    zIndex={"overlay"}
                >
                    <Heading fontSize={"2xl"} color={"neutralizerLight"}>
                        Account Information
                    </Heading>
                </Flex>
                <VStack align={"flex-start"} p={"4"}>
                    <Heading fontSize={"2xl"}>Basic Information</Heading>
                    <Divider borderColor={"neutralizerDark"} />
                    <SimpleGrid
                        templateColumns={"1fr 1fr"}
                        gridAutoFlow={"row"}
                        w={"full"}
                        spacingX={"10"}
                        spacingY={"4"}
                    >
                        <ProfileModeContext.Provider
                            value={[updating, setUpdating]}
                        >
                            <UserInfo
                                label={"Name"}
                                value={`${data?.firstName} ${
                                    data?.middleName[0]
                                        ? data?.middleName[0] + "."
                                        : ""
                                } ${data?.lastName}`}
                            />
                            <UserInfo
                                label={"Display Name"}
                                value={displayName}
                                setValue={setDisplayName}
                                isEditable
                            />
                            <UserInfo
                                label={"Email"}
                                value={`${data?.email}`}
                            />
                            <UserInfo
                                label={"Contact No."}
                                value={`${data?.mobileNumber}`}
                            />
                            <UserInfo
                                label={"Member School"}
                                value={`${data?.memberSchool?.name}`}
                            />
                            <UserInfo
                                label={"Password"}
                                placeholder={"Update Password"}
                                onClick={() => setShowUpdatePassword(true)}
                                isEditable
                                isHidden
                            />
                        </ProfileModeContext.Provider>
                    </SimpleGrid>
                </VStack>
                <UpdatePasswordModal
                    email={data?.email}
                    show={showUpdatePassword}
                    setShow={setShowUpdatePassword}
                />
                {updating && (
                    <Flex
                        position={"sticky"}
                        bottom={"0"}
                        bg={"secondary"}
                        p={"4"}
                        w={"full"}
                        align={"center"}
                        justify={"flex-end"}
                    >
                        {loading ? (
                            <>
                                <CircularProgress
                                    isIndeterminate
                                    size={8}
                                    color={"primary"}
                                    mr={"2"}
                                />
                                <Text
                                    textTransform={"uppercase"}
                                    fontWeight={"bold"}
                                    color={"neutralizerLight"}
                                >
                                    Saving
                                </Text>
                            </>
                        ) : (
                            <>
                                <Button
                                    w={"fit-content"}
                                    onClick={() => setUpdating(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    w={"fit-content"}
                                    variant={"primary"}
                                    onClick={() => save()}
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </Flex>
                )}
            </VStack>
        </>
    );
};

Profile.PageLayout = Layout;

export const getServerSideProps: GetServerSideProps<{
    userInfo?:
        | (User & { memberSchool: MemberSchool | undefined | null })
        | undefined
        | null;
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        const userInfo = await prisma.user.findFirst({
            where: {
                authId: uid,
            },
            include: {
                memberSchool: true,
            },
        });

        return {
            props: {
                userInfo,
            },
        };
    }
);

export default Profile;
