import { FormEvent, useState } from "react";

import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Heading, Center, Box, VStack, Button } from "@chakra-ui/react";

import CoreInput from "@components/CoreInput";

import logo from "@assets/CORE_Nav.png";
import CoreSelect from "@components/CoreSelect";

import { MemberSchool, Prisma } from "@prisma/client";
import { prisma } from "prisma/db";

import axios from "axios";

const RegistrationPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ memberSchools }) => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [organization, setOrganization] = useState<
        | {
              label: string;
              value: string;
          }
        | undefined
    >(undefined);
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [schoolId, setSchoolId] = useState<string>("");

    const register = async (e: FormEvent) => {
        e.preventDefault();
        let res = await axios.post("/api/user/register", {
            firstName,
            lastName,
            middleName,
            birthday,
            organizationId: organization?.value,
            email,
            mobile,
            schoolId,
        });
        console.log(res.data);
    };

    return (
        <>
            <Head>
                <title>CORE: Registration</title>
            </Head>
            <Center bg={"secondary"} minH={"100vh"} w={"100vw"}>
                <VStack
                    spacing={"0"}
                    bg={"neutralizerLight"}
                    rounded={"lg"}
                    w={"25%"}
                    overflow={"hidden"}
                    boxShadow={"2xl"}
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
                        <VStack
                            spacing={"8"}
                            w={"full"}
                            as={"form"}
                            onSubmit={register}
                        >
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
                                required
                            />
                            <CoreInput
                                placeholder={"Middle Name"}
                                value={middleName}
                                setValue={setMiddleName}
                                required
                            />
                            <CoreInput
                                placeholder={"Birthday"}
                                value={birthday}
                                setValue={setBirthday}
                                type={"date"}
                                required
                            />
                            <CoreSelect
                                placeholder={"School or Organization"}
                                value={organization}
                                setValue={setOrganization}
                                memberSchoolData={memberSchools}
                                required
                            />
                            <CoreInput
                                placeholder={"School ID"}
                                value={schoolId}
                                setValue={setSchoolId}
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
                                required
                            />
                            <Button variant={"secondary"} type={"submit"}>
                                Register
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
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
    });
    console.log(memberSchools);
    return {
        props: {
            memberSchools,
        },
    };
};

export default RegistrationPage;
