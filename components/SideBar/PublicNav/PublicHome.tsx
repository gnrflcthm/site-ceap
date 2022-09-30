import { FC, MouseEventHandler } from "react";

import {  Heading, VStack, Button } from "@chakra-ui/react";

const PublicHome: FC<{
    onLogin?: MouseEventHandler<HTMLButtonElement>;
}> = ({ onLogin }) => {
    return (
        <VStack>
            <Heading fontSize={{base:"lg", lg: "2xl"}}>
                Welcome to CEAP's Online Resources for Education
            </Heading>
            <VStack w={"full"}>
                <Button variant={"secondary"} onClick={onLogin}>
                    Login
                </Button>
                <Button variant={"primary"} as={"a"} href={"/registration/user_registration"}>
                    Register
                </Button>
            </VStack>
        </VStack>
    );
};

export default PublicHome;
