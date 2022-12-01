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
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";

const EditUserModal: FC<{
    user: IUserSchema & {
        id: string;
        memberSchool?: { id: string; name: string };
    };
    hasSchoolId?: boolean;
    onSave: Function;
    onCancel: Function;
}> = ({ user, hasSchoolId = false, onSave, onCancel }) => {
    const toast = useToast();
    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [middleName, setMiddleName] = useState<string | undefined>(
        user?.middleName
    );
    const [displayName, setDisplayName] = useState<string>(
        user.displayName || ""
    );
    const [email, setEmail] = useState<string>(user.email);
    const [mobileNumber, setMobileNumber] = useState<string>(
        user.mobileNumber || ""
    );
    const [schoolId, setSchoolId] = useState<string>(user.schoolId || "");

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
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Update Profile"}
                    onDismiss={() => onCancel()}
                />
                <VStack
                    as={"form"}
                    onSubmit={save}
                    spacing={"8"}
                    w={"full"}
                    pt={"8"}
                    px={"4"}
                    id={"editProfile"}
                >
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
                <Flex w={"full"} justify={"end"} align={"center"} p={"4"}>
                    <Button
                        variant={"secondary"}
                        mt={"4"}
                        type={"submit"}
                        form={"editProfile"}
                        disabled={loading}
                        w={"fit-content"}
                    >
                        {loading ? (
                            <CircularProgress
                                isIndeterminate
                                size={8}
                                color={"primary"}
                            />
                        ) : (
                            "Update Profile"
                        )}
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default EditUserModal;
