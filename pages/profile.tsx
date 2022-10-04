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
    CircularProgress,
    Text,
} from "@chakra-ui/react";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { MemberSchool, User } from "@prisma/client";
import { prisma } from "../prisma/db";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import axios, { AxiosError } from "axios";
import UpdatePasswordModal from "@components/Profile/UpdatePasswordModal";
import TopPanel from "@components/TopPanel";

export const ProfileModeContext = createContext<[boolean, Function]>([
    false,
    () => {},
]);

const Profile: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userInfo }) => {

    const [updating, setUpdating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [showUpdatePassword, setShowUpdatePassword] =
        useState<boolean>(false);

    const [displayName, setDisplayName] = useState<string>(
        userInfo?.displayName || ""
    );

    const save = () => {
        setLoading(true);
        axios
            .post("/api/user/update", {
                displayName /* Add more fields according to updateable fields */,
            })
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
                <TopPanel title={"Profile"} />
                <VStack align={"flex-start"} p={"4"}>
                    <Heading fontSize={{ base: "lg", lg: "2xl" }}>
                        Basic Information
                    </Heading>
                    <Divider borderColor={"neutralizerDark"} />
                    <SimpleGrid
                        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
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
                                value={`${userInfo?.firstName} ${
                                    userInfo?.middleName[0]
                                        ? userInfo?.middleName[0] + "."
                                        : ""
                                } ${userInfo?.lastName}`}
                            />
                            <UserInfo
                                label={"Display Name"}
                                value={displayName}
                                setValue={setDisplayName}
                                isEditable
                            />
                            <UserInfo
                                label={"Email"}
                                value={`${userInfo?.email}`}
                            />
                            <UserInfo
                                label={"Contact No."}
                                value={`${userInfo?.mobileNumber}`}
                            />
                            <UserInfo
                                label={"Member School"}
                                value={`${userInfo?.memberSchool?.name}`}
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
                    email={userInfo?.email}
                    show={showUpdatePassword}
                    setShow={setShowUpdatePassword}
                />
                {updating && ( // Fix: Update design, panget tignan.
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
                                    onClick={() => {
                                        setDisplayName(userInfo?.displayName || "");
                                        setUpdating(false);
                                    }}
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
