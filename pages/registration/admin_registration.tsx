import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { prisma } from "prisma/db";
import AdminRegistrationForm from "@components/Register/AdminRegistrationForm";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";

import logo from "@assets/CORE_L.png";
import { useState } from "react";
import { SuccessPage } from "@components/Register";

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
                    <Center position={"relative"} p={"20"} w={"full"} mb={"4"}>
                        <Image
                            src={logo}
                            layout={"fill"}
                            objectFit={"contain"}
                        />
                    </Center>
                    <Box w={"full"} px={"10"} py={'4'}>
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
