import { FC, useState } from "react";

import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Box, VStack, Flex, useToken, Center } from "@chakra-ui/react";

import logo from "@assets/CORE_L.png";
import bg from "@assets/aboutimghd.jpg";

import { RegistrationForm, SuccessPage } from "@components/Register";
import { FaArrowLeft } from "react-icons/fa";
import { connectDB, IMemberSchoolSchema, MemberSchool } from "@db/index";

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
    const [primary] = useToken("colors", ["primary"]);
    return (
        <>
            <Head>
                <title>CORE: Registration</title>
            </Head>
            <Center
                minH={"100vh"}
                w={"100vw"}
                overflow={"hidden"}
                bg={`linear-gradient(${primary}99, ${primary}99), url(${bg.src})`}
                bgPos={"center"}
                bgAttachment={"fixed"}
                bgRepeat={"no-repeat"}
                bgSize={"cover"}
            >
                <VStack
                    spacing={"0"}
                    bg={"neutralizerLight"}
                    w={{ base: "100%", md: "70%", lg: "50%" }}
                    maxH={"100vh"}
                    rounded={"md"}
                    overflow={"hidden"}
                    overflowY={"auto"}
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
            </Center>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    memberSchools: IMemberSchoolSchema[];
}> = async () => {
    await connectDB();

    const memberSchools = await MemberSchool.find({
        isRegistered: true,
    });

    return {
        props: {
            memberSchools: memberSchools.map((school) => school.toJSON()),
        },
    };
};

export default UserRegistrationPage;
