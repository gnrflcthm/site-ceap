import { FC, FormEvent, useState } from "react";

import {
    Button,
    Flex,
    Heading,
    VStack,
    Text,
    Switch,
    CircularProgress,
    useToast,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import axios, { AxiosError } from "axios";

const AddAdminPopup: FC<{ hideForm: Function }> = ({ hideForm }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    const submit = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        axios
            .post("/api/member/create", {
                firstName,
                lastName,
                middleName,
                email,
                mobileNumber,
                isSuperAdmin,
            })
            .then(() => {
                hideForm();
                toast({
                    status: "success",
                    title: "Successfully Created Admin",
                });
                setLoading(false);
            })
            .catch((error: AxiosError) => {
                setError(error.response?.statusText);
                toast({
                    status: "error",
                    title: "Error In Creating Account",
                });
                setLoading(false);
            });
    };

    return (
        <Flex
            p={"6"}
            flexDir={"column"}
            rounded={"md"}
            shadow={"dark-lg"}
            bg={"neutralizerLight"}
        >
            <Heading mb={"8"}>Create Admin</Heading>
            <form onSubmit={submit}>
                <VStack spacing={"8"}>
                    <CoreInput
                        value={lastName}
                        setValue={setLastName}
                        placeholder={"Last Name"}
                        disabled={loading}
                        required
                    />
                    <CoreInput
                        value={firstName}
                        setValue={setFirstName}
                        placeholder={"First Name"}
                        disabled={loading}
                        required
                    />
                    <CoreInput
                        value={middleName}
                        setValue={setMiddleName}
                        placeholder={"Middle Name"}
                        disabled={loading}
                    />
                    <CoreInput
                        value={email}
                        setValue={setEmail}
                        placeholder={"Email Address"}
                        disabled={loading}
                        pattern={"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"}
                        required
                    />
                    <CoreInput
                        value={mobileNumber}
                        setValue={setMobileNumber}
                        placeholder={"Contact Number"}
                        pattern={"^\\+63\\d{10}$"}
                        disabled={loading}
                    />
                </VStack>
                <Flex
                    justify={"flex-start"}
                    align={"center"}
                    w={"full"}
                    my={"4"}
                >
                    <Switch
                        mr={"2"}
                        onChange={() => {
                            setIsSuperAdmin((val) => !val);
                        }}
                        isChecked={isSuperAdmin}
                        disabled={loading}
                    />
                    <Text fontSize={"lg"}>CEAP Super Admin</Text>
                </Flex>
                {error && (
                    <Text my={"2"} color={"red.500"} textAlign={"center"}>
                        {error}
                    </Text>
                )}
                <Button
                    variant={"secondary"}
                    rounded={"md"}
                    type={"submit"}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            isIndeterminate
                            size={8}
                            color={"primary"}
                        />
                    ) : (
                        "Create Administrator"
                    )}
                </Button>
            </form>
        </Flex>
    );
};

export default AddAdminPopup;
