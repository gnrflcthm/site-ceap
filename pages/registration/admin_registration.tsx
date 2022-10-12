import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { prisma } from "prisma/db";
import AdminRegistrationForm from "@components/Register/AdminRegistrationForm";
import { Box, Center, Flex } from "@chakra-ui/react";

import logo from "@assets/CORE_L.png";
import { useState } from "react";
import { SuccessPage } from "@components/Register";

import { FaArrowLeft } from "react-icons/fa";

const AdminRegistrationPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ memberSchools }) => {
    const [state, setState] = useState<"registration" | "success">(
        "registration"
    );

    return (
        <>
            <Head>
                <title>CORE Admin Registration</title>
            </Head>
            <Center minH={"100vh"} minW={"100vw"} bg={"neutralizerDark"}>
                <Flex
                    flexDir={"column"}
                    bg="neutralizerLight"
                    rounded={"md"}
                    shadow={"lg"}
                    py={"4"}
                    w={{ base: "100%%", md: "50%", lg: "25%" }}
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
                    <Box w={"full"} px={"10"} py={"4"}>
                        {state === "success" ? (
                            <SuccessPage />
                        ) : (
                            <AdminRegistrationForm
                                memberSchools={memberSchools}
                                setState={setState}
                            />
                        )}
                    </Box>
                </Flex>
            </Center>
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
            isRegistered: false,
        },
        orderBy: {
            region: "asc",
        },
    });
    return {
        props: {
            memberSchools,
        },
    };
};

export default AdminRegistrationPage;
