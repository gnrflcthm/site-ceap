import { useState } from "react";

import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Heading, Center, Box, VStack, Button, Flex } from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";

import logo from "@assets/CORE_Nav.png";

const RegistrationPage: NextPage = () => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [organization, setOrganization] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <>
            <Head>
                <title>CORE: Registration</title>
            </Head>
            <Center bg={"white"} minH={"100vh"} w={"100vw"}>
                <VStack
                    spacing={"0"}
                    bg={"neutralizerLight"}
                    rounded={"lg"}
                    w={"25%"}
                    overflow={"hidden"}
                    boxShadow={"2xl"}
                    border={"1px"}
                    borderColor={"blackAlpha.200"}
                >
                    <Link href={"/"} passHref>
                        <Center as={"a"} bg={"primary"} w={"full"} p={"4"}>
                            <Box
                                position={"relative"}
                                objectFit={"contain"}
                                w={"full"}
                                py={"8"}
                            >
                                <Image
                                    src={logo}
                                    layout={"fill"}
                                    objectFit={"contain"}
                                />
                            </Box>
                        </Center>
                    </Link>
                    <Box p={"8"} w={"full"}>
                        <Heading fontSize={"3xl"} textAlign={"center"} mb={"4"}>
                            Registration
                        </Heading>
                        <VStack spacing={"8"} w={"full"} as={"form"}>
                            <CoreInput
                                placeholder={"Last Name"}
                                value={lastName}
                                setValue={setLastName}
                                required
                            />
                            <CoreInput
                                placeholder={"First Name"}
                                value={firstName}
                                setValue={setFirstName}
                            />
                            <CoreInput
                                placeholder={"Middle Name"}
                                value={middleName}
                                setValue={setMiddleName}
                            />
                            <CoreInput
                                placeholder={"Birthday"}
                                value={birthday}
                                setValue={setBirthday}
                                type={"date"}
                            />
                            <CoreInput
                                placeholder={"School or Organization"}
                                setValue={setOrganization}
                                value={organization}
                                values={["UST", "FEU"]}
                                type={"select"}
                            />
                            <CoreInput
                                placeholder={"Mobile Number."}
                                value={mobile}
                                setValue={setMobile}
                                type={"tel"}
                            />
                            <CoreInput
                                placeholder={"Email Address"}
                                value={email}
                                setValue={setEmail}
                                type={"email"}
                            />
                            <Button variant={"secondary"}>Register</Button>
                        </VStack>
                    </Box>
                </VStack>
            </Center>
        </>
    );
};

export default RegistrationPage;
