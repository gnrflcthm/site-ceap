import { FC, FormEvent, FormEventHandler, useState } from "react";

import CoreInput from "@components/CoreInput";

import {
    VStack,
    Heading,
    Button,
    Box,
    Center,
    CircularProgress,
    Text,
    Flex,
} from "@chakra-ui/react";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../../../firebase/client";
import { FaCaretLeft } from "react-icons/fa";

const ForgotPassword: FC<{ setMode: Function }> = ({ setMode }) => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<any | undefined>(undefined);

    const sendResetEmail = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (err) {
            console.log(err);
            setError(err);
        }
        setLoading(false);
    };

    return (
        <Flex flexDir={"column"} align={"stretch"} justify={"center"}>
            {!(loading || error || success) && (
                <Flex
                    justify={"flex-start"}
                    align={"center"}
                    alignSelf={"flex-start"}
                    color={"neturalizerDark"}
                    _hover={{
                        color: "secondary",
                    }}
                    onClick={() => setMode("")}
                >
                    <Box as={FaCaretLeft} color={"inherit"} />
                    <Button variant={"transparent"} color={"inherit"}>
                        Return
                    </Button>
                </Flex>
            )}
            <Heading mb={"8"}>Reset Password</Heading>
            {!(loading || success || error) && (
                <VStack
                    as={"form"}
                    onSubmit={sendResetEmail}
                    w={"full"}
                    spacing={"4"}
                >
                    <CoreInput
                        value={email}
                        setValue={setEmail}
                        placeholder={"Enter your Email Address"}
                        type={"email"}
                        required
                    />
                    <Button variant={"secondary"} type={"submit"}>
                        Reset Password
                    </Button>
                </VStack>
            )}
            {loading && !(success || error) && (
                <Center flexDir={"column"}>
                    <Text fontSize={"md"} textAlign={"center"} mb={"4"}>
                        Generating Password Reset Link.
                    </Text>
                    <CircularProgress isIndeterminate color={"secondary"} />
                </Center>
            )}
            {success && (
                <Center as={VStack} flexDir={"column"}>
                    <Text textAlign={"center"}>
                        The password reset link has been successfully sent to
                        your email.
                    </Text>
                    <Button variant={"primary"} onClick={() => setMode("")}>
                        Return
                    </Button>
                </Center>
            )}
            {error && (
                <Center as={VStack} flexDir={"column"}>
                    <Text textAlign={"center"}>
                        An error has occured resetting password. Please check if
                        the email you have entered is valid.
                    </Text>
                    <Button variant={"primary"} onClick={() => setMode("")}>
                        Return
                    </Button>
                </Center>
            )}
        </Flex>
    );
};

export default ForgotPassword;
