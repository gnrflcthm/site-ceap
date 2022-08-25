import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";

import { VStack, Heading, Button, Text } from "@chakra-ui/react";

import CoreInput from "@components/CoreInput";

const PublicNavLogin: FC<{ setMode: Function }> = ({ setMode }) => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <VStack>
            <Heading>Login</Heading>
            <CoreInput
                value={id}
                setValue={setId}
                placeholder={"Email or Contact No."}
            />
            <CoreInput
                value={password}
                setValue={setPassword}
                placeholder={"Password"}
            />
            <Button variant={"secondary"} onClick={() => {}}>
                Login
            </Button>
            <Text>
                Don't have an account?{" "}
                <Link href={"/registration"} passHref>
                    <Button variant={"link"} as={"a"}>
                        Register Now
                    </Button>
                </Link>
            </Text>
        </VStack>
    );
};

export default PublicNavLogin;
