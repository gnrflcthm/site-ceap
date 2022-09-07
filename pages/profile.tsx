import { useContext } from "react";
import { PageWithLayout } from "./_app";

import Head from "next/head";

import UserInfo from "@components/Profile/UserInfo";

import { VStack, Heading, Divider, SimpleGrid, Flex } from "@chakra-ui/react";
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
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <VStack align={"stretch"} spacing={"2"}>
                <Flex
                    position={"sticky"}
                    top={"0"}
                    bg={"secondary"}
                    p={"4"}
                    align={"center"}
                >
                    <Heading fontSize={"2xl"} color={"neutralizerLight"}>
                        Account Information
                    </Heading>
                </Flex>
                <VStack align={"flex-start"} p={"4"}>
                    <Heading fontSize={"2xl"}>Basic Information</Heading>
                    <Divider borderColor={"neutralizerDark"} />
                    <SimpleGrid
                        templateRows={"1fr 1fr 1fr 1fr 1fr"}
                        gridAutoFlow={"column"}
                        w={"full"}
                        spacingX={"10"}
                        spacingY={"4"}
                    >
                        <UserInfo
                            label={"Name"}
                            value={`${data?.firstName} ${data?.middleName[0]}. ${data?.lastName}`}
                        />
                        <UserInfo
                            label={"Display Name"}
                            value={user?.displayName || ""}
                        />
                        <UserInfo label={"Email"} value={`${data?.email}`} />
                        <UserInfo
                            label={"Contact No."}
                            value={`${data?.mobileNumber}`}
                        />
                        <UserInfo
                            label={"Member School"}
                            value={`${data?.memberSchool?.name}`}
                        />
                    </SimpleGrid>
                </VStack>
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
