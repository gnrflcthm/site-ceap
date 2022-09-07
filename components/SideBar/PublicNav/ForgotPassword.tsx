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
} from "@chakra-ui/react";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../../../firebase/client";

const ForgotPassword: FC<{setMode: Function}> = ({setMode}) => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const sendResetEmail = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const auth = getAuth();
        sendPasswordResetEmail(auth, email, {
            url: "http://localhost",
            handleCodeInApp: true,
        })
            .then(() => {
                setLoading(false);
                setSuccess(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <VStack spacing={"8"}>
            <Heading>Reset Password</Heading>
            {!loading && !success && (
                <VStack as={"form"} onSubmit={sendResetEmail} w={"full"} spacing={'4'}>
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
            {loading && (
                <Center flexDir={"column"}>
                    <Text fontSize={"md"} textAlign={"center"} mb={'4'}>
                        Generating Password Reset Link.
                    </Text>
                    <CircularProgress isIndeterminate color={"secondary"} />
                </Center>
            )}
            {success && !loading && (
                <Center as={VStack} flexDir={"column"}>
                    <Text textAlign={"center"}>
                        The password reset link has been successfully sent to
                        your email.
                    </Text>
                    <Button variant={"primary"} onClick={() => setMode("")}>Return</Button>
                </Center>
            )}
        </VStack>
    );
};

export default ForgotPassword;
