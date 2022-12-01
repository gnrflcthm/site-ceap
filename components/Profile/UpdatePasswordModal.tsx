import { FC, FormEvent, useState } from "react";

import {
    useDisclosure,
    Heading,
    VStack,
    ModalFooter,
    Button,
    Text,
    CircularProgress,
    useToast,
    Flex,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";

import "../../firebase/client";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
} from "firebase/auth";
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";

const UpdatePasswordModal: FC<{
    email?: string;
    onDismiss: Function;
}> = ({ email, onDismiss }) => {
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
            onDismiss();
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
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Update Password"}
                    onDismiss={() => onDismiss()}
                />
                <VStack
                    spacing={"8"}
                    p={"8"}
                    pb={"0"}
                    as={"form"}
                    id={"passwordForm"}
                    onSubmit={updatePass}
                >
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
                <Flex justify={"flex-end"} align={"center"} w={"full"} p={"4"}>
                    <Button
                        variant={"secondary"}
                        w={"fit-content"}
                        type="submit"
                        form={"passwordForm"}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                color={"primary"}
                                isIndeterminate
                                size={8}
                            />
                        ) : (
                            "Update Password"
                        )}
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default UpdatePasswordModal;
