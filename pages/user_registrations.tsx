import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { PageWithLayout } from "./_app";
import Layout from "@components/Layout";

import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import { prisma } from "../prisma/db";
import { AccountType, UserRegistration } from "@prisma/client";
import {
    Box,
    Button,
    CircularProgress,
    Flex,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import RegistrationData from "@components/Registrations/UserRegistrations";
import { FaSync } from "react-icons/fa";
import { getRegistrations } from "@util/api/registrations";

const UserRegistrations: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ registrations }) => {
    const { data, isLoading, isError, refetch, isRefetching } = useQuery<
        UserRegistration[]
    >(["registrations"], getRegistrations, {
        initialData: registrations,
        staleTime: 60 * 10 * 1000,
        initialDataUpdatedAt: Date.now(),
    });

    return (
        <>
            <Head>
                <title>User Registrations</title>
            </Head>
            <Flex
                flexDir={"column"}
                justify={"flex-start"}
                align={"stretch"}
                overflow={"hidden"}
                h={"full"}
            >
                <Flex
                    bg={"secondary"}
                    p={"4"}
                    position={"sticky"}
                    top={"0"}
                    justify={"space-between"}
                    align={"center"}
                >
                    <Heading fontSize={"2xl"} color={"neutralizerLight"}>
                        User Registrations
                    </Heading>
                    {isLoading || isRefetching ? (
                        <Flex
                            justify={"space-between"}
                            align={"center"}
                            color={"neutralizerLight"}
                            p={"2"}
                        >
                            <CircularProgress
                                isIndeterminate
                                size={"4"}
                                mr={"2"}
                                color={"secondary"}
                                thickness={"10"}
                            />
                            <Text
                                fontWeight={"bold"}
                                textTransform={"uppercase"}
                                color={"inherit"}
                                fontSize={"md"}
                            >
                                Refreshing
                            </Text>
                        </Flex>
                    ) : (
                        <Button
                            variant={"transparent"}
                            onClick={() => refetch({})}
                        >
                            <Box
                                as={FaSync}
                                color={"neutralizerLight"}
                                mr={"2"}
                            />{" "}
                            Refresh
                        </Button>
                    )}
                </Flex>
                <VStack p={"4"} pt={"6"} overflow={"hidden"} overflowY={"auto"}>
                    {data?.map((reg) => (
                        <RegistrationData data={reg} key={reg.id} />
                    ))}
                </VStack>
            </Flex>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    registrations?: UserRegistration[];
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        const user = await prisma.user.findFirst({
            where: {
                authId: uid,
            },
        });

        if (user?.accountType !== AccountType.MS_ADMIN || !user) {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                },
            };
        }

        const registrations = await prisma.userRegistration.findMany({
            where: {
                memberSchoolId: user?.memberSchoolId,
            },
        });

        return {
            props: {
                registrations: user
                    ? registrations.map((reg) => ({
                          ...reg,
                          birthday: reg.birthday.getDate().toString(),
                      }))
                    : [],
            },
        };
    }
);

UserRegistrations.PageLayout = Layout;

export default UserRegistrations;
