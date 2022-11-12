import { FC, useState, FormEvent, useMemo } from "react";
import Link from "next/link";

import {
    VStack,
    Button,
    Heading,
    CircularProgress,
    Text,
    Center,
    useDisclosure,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import CoreInput from "@components/CoreInput";
import CoreSelect from "@components/CoreSelect";
import { AnimatePresence } from "framer-motion";
import DPAModal from "@components/Modal/DPAModal";

const RegistrationForm: FC<{
    memberSchools: any[];
    setState: Function;
}> = ({ memberSchools, setState }) => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | "">("");
    const [memberSchoolId, setMemberSchoolId] = useState<string>("");
    const [region, setRegion] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [schoolId, setSchoolId] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");

    const regions = useMemo<{ name: string; value: string }[]>(() => {
        return memberSchools
            .map((ms) => ms.region)
            .filter((reg, i, arr) => arr.indexOf(reg) === i)
            .map((reg) => ({ name: reg, value: reg }));
    }, [memberSchools]);

    const { isOpen, onClose, onOpen } = useDisclosure();

    const register = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("/api/user/register", {
                firstName,
                lastName,
                middleName,
                birthday,
                memberSchoolId,
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
                Member School User Registration
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
                <CoreInput
                    placeholder={"Region of your school"}
                    value={region}
                    setValue={setRegion}
                    type={"select"}
                    values={regions}
                    selectPrompt={"Select Region"}
                    required
                />
                {region && (
                    <CoreSelect
                        placeholder={"School or Organization"}
                        setValue={setMemberSchoolId}
                        // @ts-ignore
                        options={memberSchools}
                        filter={region}
                        required
                        isGrouped
                    />
                )}
                <CoreInput
                    placeholder={"School ID"}
                    value={schoolId}
                    setValue={setSchoolId}
                />
                <CoreInput
                    placeholder={"Mobile Number (+639xxxxxxxxx)"}
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
                By registering, you are agreeing to our{" "}
                <Button
                    variant={"link"}
                    display={"inline"}
                    onClick={() => onOpen()}
                >
                    Terms and Conditions
                </Button>
            </Text>
            <Text mt={"4"} textAlign={"center"}>
                Can't find your region or school at the list?
                <Link href={"/registration/admin_registration"} passHref>
                    <Button
                        variant={"link"}
                        display={"block"}
                        as={"a"}
                        color={"primary"}
                        textDecor={"underline"}
                        cursor={"pointer"}
                        textAlign={"center"}
                        w={"full"}
                    >
                        Register as an Administrator of your school
                    </Button>
                </Link>
                .
            </Text>
            <AnimatePresence>
                {isOpen && <DPAModal onDismiss={() => onClose()} />}
            </AnimatePresence>
        </>
    );
};

export default RegistrationForm;
