import { FC, FormEvent, useState } from "react";

import { Button, Flex, Heading, VStack, Text, Switch } from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import axios, { AxiosError } from "axios";

const AddAdminPopup: FC<{ hideForm: Function }> = ({ hideForm }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            let res = await axios.post("/api/member/create", {
                firstName,
                lastName,
                middleName,
                email,
                mobileNumber,
                isSuperAdmin,
            });

            if (res.status === 200) {
                console.log("User Created");
                hideForm();
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
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
                    />
                    <CoreInput
                        value={firstName}
                        setValue={setFirstName}
                        placeholder={"First Name"}
                    />
                    <CoreInput
                        value={middleName}
                        setValue={setMiddleName}
                        placeholder={"Middle Name"}
                    />
                    <CoreInput
                        value={email}
                        setValue={setEmail}
                        placeholder={"Email Address"}
                    />
                    <CoreInput
                        value={mobileNumber}
                        setValue={setMobileNumber}
                        placeholder={"Contact Number"}
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
                    />
                    <Text fontSize={"lg"}>CEAP Super Admin</Text>
                </Flex>
                {error && (
                    <Text my={"2"} color={"red.500"} textAlign={"center"}>
                        {error}
                    </Text>
                )}
                <Button variant={"secondary"} rounded={"md"} type={"submit"}>
                    Create Administrator
                </Button>
            </form>
        </Flex>
    );
};

export default AddAdminPopup;
