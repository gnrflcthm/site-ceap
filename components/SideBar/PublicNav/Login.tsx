import { FC, FormEvent, useState, useContext } from "react";
import Link from "next/link";

import {
    VStack,
    Heading,
    Button,
    Text,
    Flex,
    Center,
    CircularProgress,
    Box,
} from "@chakra-ui/react";

import "../../../firebase/client";

import CoreInput from "@components/CoreInput";
import { AuthContext } from "@context/AuthContext";
import { FaCaretLeft } from "react-icons/fa";

const Login: FC<{ setMode: Function }> = ({ setMode }) => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { login } = useContext(AuthContext);

    const onLogin = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        login(id, password).catch(() => {
            setLoading(false);
            setError("Invalid Login Credentials");
            setLoading(false);
        });
    };

    return (
        <Flex
            flexDir={"column"}
            align={"stretch"}
            justify={"flex-start"}
            as={"form"}
            onSubmit={onLogin}
        >
            {loading ? (
                <Center flexDir={"column"}>
                    <Text mb={"4"}>Signing In</Text>
                    <CircularProgress isIndeterminate color={"secondary"} />
                </Center>
            ) : (
                <>
                    <Flex
                        justify={"flex-start"}
                        align={"center"}
                        alignSelf={"flex-start"}
                        color={"neturalizerDark"}
                        _hover={{
                            color: "secondary",
                        }}
                        w={"full"}
                    >
                        <Button
                            variant={"transparent"}
                            color={"inherit"}
                            onClick={() => setMode("")}
                            p={"0"}
                        >
                            <Box as={FaCaretLeft} color={"inherit"} />
                            Return
                        </Button>
                    </Flex>
                    <Heading textAlign={"center"}>Login</Heading>
                    <VStack spacing={"8"} mt={"8"}>
                        <CoreInput
                            value={id}
                            setValue={setId}
                            placeholder={"Email Address"}
                            required
                        />
                        <CoreInput
                            value={password}
                            type={"password"}
                            setValue={setPassword}
                            placeholder={"Password"}
                            required
                        />
                    </VStack>
                    {error && (
                        <Text as={"small"} fontSize={"sm"} color={"red.500"}>
                            {error}
                        </Text>
                    )}
                    <Button variant={"secondary"} type={"submit"} mt={"4"}>
                        Login
                    </Button>
                    <VStack mt={"4"}>
                        <Text fontSize={"md"} textAlign={"center"}>
                            Don't have an account?{" "}
                            <Link
                                href={"/registration/user_registration"}
                                passHref
                            >
                                <Button variant={"link"} as={"a"}>
                                    Register Now
                                </Button>
                            </Link>
                        </Text>
                        <Button
                            variant={"link"}
                            onClick={() => setMode("forgot-password")}
                        >
                            Forgot Password?
                        </Button>
                    </VStack>
                </>
            )}
        </Flex>
    );
};

export default Login;
