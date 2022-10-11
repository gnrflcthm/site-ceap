import { FC, useState, FormEvent } from "react";
import Link from "next/link";

import {
    VStack,
    Button,
    Heading,
    CircularProgress,
    Text,
    Center,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import CoreInput from "@components/CoreInput";
import CoreSelect from "@components/CoreSelect";

const RegistrationForm: FC<{
    memberSchools: any[];
    setState: Function;
}> = ({ memberSchools, setState }) => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | "">("");
    const [organization, setOrganization] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [schoolId, setSchoolId] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");

    const register = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        console.table({
            firstName,
            lastName,
            middleName,
            birthday,
            organizationId: organization,
            email,
            mobile,
            schoolId,
        });

        axios
            .post("/api/user/register", {
                firstName,
                lastName,
                middleName,
                birthday,
                organizationId: organization,
                email,
                mobile,
                schoolId,
            })
            .then(() => {
                setLoading(false);
                setState("success");
            })
            .catch((err: AxiosError) => {
                setError(err.response?.statusText);
                setLoading(false);
            });
    };
    return (
        <>
            <Heading fontSize={"3xl"} textAlign={"center"} mb={"4"}>
                Registration
            </Heading>
            <VStack
                spacing={"8"}
                w={"full"}
                as={"form"}
                onSubmit={register}
                onFocus={() => setError("")}
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
                    setValue={setOrganization}
                    // @ts-ignore
                    options={memberSchools}
                    required
                    isGrouped
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
                    pattern={"^\\+63\\d{10}$"}
                />
                <CoreInput
                    placeholder={"Email Address"}
                    value={email}
                    setValue={setEmail}
                    type={"email"}
                    pattern={"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
                    required
                />
                <Center w={"full"} flexDir={"column"}>
                    {error && (
                        <Text color={"red"} fontSize={"sm"} as={"small"}>
                            {error}
                        </Text>
                    )}
                    <Button
                        variant={"secondary"}
                        type={"submit"}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                isIndeterminate
                                size={"6"}
                                color={"primary"}
                            />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </Center>
            </VStack>
            <Text mt={"4"} textAlign={"center"}>
                Can't find your school at the list?
                <Link href={"/registration/admin_registration"} passHref>
                    <Text
                        display={"block"}
                        as={"a"}
                        color={"primary"}
                        textDecor={"underline"}
                        cursor={"pointer"}
                    >
                        Register As An Administrator Of Your School
                    </Text>
                </Link>
                .
            </Text>
        </>
    );
};

export default RegistrationForm;
