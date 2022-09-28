import { FC, FormEvent, useState } from "react";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Heading,
    VStack,
    ModalFooter,
    Button,
    Text,
    CircularProgress,
    useToast,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";

import "../../firebase/client";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
} from "firebase/auth";

const UpdatePasswordModal: FC<{
    email?: string;
    show: boolean;
    setShow: Function;
}> = ({ email, show, setShow }) => {
    const { isOpen, onClose, onOpen } = useDisclosure({
        isOpen: show,
        onClose: () => {
            setShow(false);
            setCurrent("");
            setNewPassword("");
            setConfirmPassword("");
        },
    });

    const [current, setCurrent] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const toast = useToast();

    const updatePass = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        const auth = getAuth();

        try {
            let { user } = await signInWithEmailAndPassword(
                auth,
                email || "",
                current
            );
            await updatePassword(user, newPassword);
            await signOut(auth);
            onClose();
            toast({
                title: "Updated Password Successfully",
                status: "success",
                duration: 2000,
            });
        } catch (err) {
            setError("The current password you entered is wrong or invalid.");
        }
        setLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                as={"form"}
                p={"4"}
                rounded={"md"}
                onFocus={() => setError(undefined)}
                onSubmit={updatePass}
            >
                <ModalHeader mb={"4"}>
                    <Heading textAlign={"center"}>Update Password</Heading>
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={"8"}>
                        <CoreInput
                            placeholder={"Current Password"}
                            type={"password"}
                            value={current}
                            setValue={setCurrent}
                            disabled={loading}
                        />
                        <CoreInput
                            placeholder={"New Password"}
                            type={"password"}
                            value={newPassword}
                            setValue={setNewPassword}
                            disabled={loading}
                        />
                        <CoreInput
                            placeholder={"Confirm Password"}
                            type={"password"}
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            disabled={loading}
                        />
                        {error && (
                            <Text as={"small"} fontSize={"sm"} color={"red"}>
                                {error}
                            </Text>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        w={"fit-content"}
                        fontSize={"md"}
                        mr={"2"}
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type={"submit"}
                        w={"fit-content"}
                        fontSize={"md"}
                        variant={"secondary"}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <CircularProgress
                                    size={6}
                                    mr={"2"}
                                    color={"primary"}
                                />
                                {" Updating"}
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdatePasswordModal;
