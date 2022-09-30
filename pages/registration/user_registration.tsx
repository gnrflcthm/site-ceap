import { FC, useState } from "react";

import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Box, VStack, Flex } from "@chakra-ui/react";

import logo from "@assets/CORE_L.png";

import { Prisma } from "@prisma/client";
import { prisma } from "prisma/db";

import { RegistrationForm, SuccessPage } from "@components/Register";
import { FaArrowLeft } from "react-icons/fa";

export type RegistrationState = "fillup" | "success";

const RegistrationStateWrapper: FC<{
    state: RegistrationState;
    setState: Function;
    memberSchools: any[];
}> = ({ state, setState, memberSchools }) => {
    switch (state) {
        case "success":
            return <SuccessPage />;
        default:
            return (
                <RegistrationForm
                    memberSchools={memberSchools}
                    setState={setState}
                />
            );
    }
};

const UserRegistrationPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ memberSchools }) => {
    const [state, setState] = useState<RegistrationState>("fillup");

    return (
        <>
            <Head>
                <title>CORE: Registration</title>
            </Head>
            <Flex bg={"neutralizerDark"} minH={"100vh"} w={"100vw"}>
                <VStack
                    spacing={"0"}
                    bg={"neutralizerLight"}
                    w={{ base: "100%", md: "70%", lg: "35%", xl: "25%" }}
                    overflowY={"auto"}
                    overflowX={"hidden"}
                    borderColor={"blackAlpha.200"}
                >
                    <Flex
                        justify={"space-between"}
                        align={"center"}
                        w={"full"}
                        px={"8"}
                        py={"4"}
                        // bg={"primary"}
                    >
                        <Link href={"/"} passHref>
                            <Box
                                as={"a"}
                                color={"neutralizerDark"}
                                _hover={{ color: "secondary" }}
                            >
                                <Box as={FaArrowLeft} color={"inherit"} />
                            </Box>
                        </Link>
                        <Link href={"/"} passHref>
                            <Box
                                as={"a"}
                                position={"relative"}
                                objectFit={"contain"}
                                h={"full"}
                                w={"full"}
                                p={"20"}
                            >
                                <Image
                                    src={logo}
                                    layout={"fill"}
                                    objectFit={"contain"}
                                />
                            </Box>
                        </Link>
                    </Flex>
                    <Box px={"8"} py={"2"} w={"full"}>
                        <RegistrationStateWrapper
                            state={state}
                            setState={setState}
                            memberSchools={memberSchools}
                        />
                    </Box>
                </VStack>
            </Flex>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    memberSchools:
        | (Prisma.PickArray<
              Prisma.MemberSchoolGroupByOutputType,
              ("region" | "id" | "name" | "address")[]
          > & {})[];
}> = async () => {
    const memberSchools = await prisma.memberSchool.groupBy({
        by: ["region", "name", "id", "address"],
        where: {
            isRegistered: true,
        },
    });
    return {
        props: {
            memberSchools,
        },
    };
};

export default UserRegistrationPage;
