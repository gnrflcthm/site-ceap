import {
    Button,
    Center,
    Flex,
    Heading,
    useToast,
    VStack,
    Text,
    CircularProgress,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import { getAccountType } from "@util/functions";
import { FC, FormEvent, useState } from "react";

import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import { IUserSchema } from "@db/models";
import { AccountType } from "@util/Enums";

const EditUserModal: FC<{
    user: IUserSchema & {
        id: string;
        memberSchool?: { id: string; name: string };
    };
    hasSchoolId?: boolean;
    accountTypes: AccountType[];
    onSave: Function;
    onCancel: Function;
}> = ({ user, hasSchoolId = false, accountTypes, onSave, onCancel }) => {
    const toast = useToast();
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [middleName, setMiddleName] = useState<string | undefined>(user?.middleName);
    const [displayName, setDisplayName] = useState<string>(
        user.displayName || ""
    );
    const [email, setEmail] = useState<string>(user.email);
    const [mobileNumber, setMobileNumber] = useState<string>(
        user.mobileNumber || ""
    );
    const [schoolId, setSchoolId] = useState<string>(user.schoolId || "");
    const [accountType, setAccountType] = useState<AccountType>(
        user.accountType
    );
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const save = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        axios
            .patch("/api/member/update", {
                id: user.id,
                firstName,
                lastName,
                middleName,
                displayName,
                email,
                mobileNumber,
                accountType,
                schoolId: hasSchoolId ? schoolId : "",
            })
            .then(() => {
                toast({
                    status: "success",
                    title: "User Updated Successfully",
                    duration: 2000,
                });
                onSave();
            })
            .catch((err: AxiosError) => {
                setError(err.response?.statusText || "Error in updating user.");
                setLoading(false);
            });
    };

    return (
        <Center
            as={motion.div}
            position={"absolute"}
            w={"full"}
            h={"full"}
            top={"0"}
            left={"0"}
            bg={"blackAlpha.500"}
            zIndex={"modal"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Flex
                as={motion.div}
                flexDir={"column"}
                justify={"flex-start"}
                align={"stretch"}
                rounded={"md"}
                position={"relative"}
                bg={"neutralizerLight"}
                p={"8"}
                w={{ base: "90%", md: "75%", xl: "25%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Heading mb={"8"} textAlign={"center"} w={"full"}>
                    Edit User
                </Heading>
                <form onSubmit={save}>
                    <VStack spacing={"8"} w={"full"}>
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
                            value={displayName}
                            setValue={setDisplayName}
                            placeholder={"Display Name"}
                            disabled={loading}
                            required
                        />
                        <CoreInput
                            value={email}
                            setValue={setEmail}
                            placeholder={"Email Address"}
                            disabled={loading}
                            required
                        />
                        <CoreInput
                            value={mobileNumber}
                            setValue={setMobileNumber}
                            placeholder={"Mobile Number (+639xxxxxxxxx)"}
                            disabled={loading}
                            pattern={"^\\+63\\d{10}$"}
                        />
                        {hasSchoolId && (
                            <CoreInput
                                value={schoolId}
                                setValue={setSchoolId}
                                placeholder={"School ID"}
                                disabled={loading}
                            />
                        )}
                        <CoreInput
                            value={accountType}
                            setValue={setAccountType}
                            placeholder={"Account Type"}
                            type={"select"}
                            values={accountTypes.map((val) => ({
                                name: getAccountType(val),
                                value: val,
                            }))}
                            disabled={loading}
                        />
                    </VStack>
                    {error && (
                        <Text
                            my={"2"}
                            color={"red.500"}
                            textAlign={"center"}
                            w={"full"}
                        >
                            {error}
                        </Text>
                    )}
                    <Button
                        variant={"secondary"}
                        mt={"4"}
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
                            "Save"
                        )}
                    </Button>
                    <Button
                        type={"button"}
                        variant={"outline"}
                        mt={"4"}
                        rounded={"md"}
                        onClick={() => onCancel()}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </form>
            </Flex>
        </Center>
    );
};

export default EditUserModal;
