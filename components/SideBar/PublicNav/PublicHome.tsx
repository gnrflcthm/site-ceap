import { FC, MouseEventHandler } from "react";

import Image from "next/image";

import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

import coreLogo from "@assets/CORE_logo.png";

const PublicHome: FC<{
    onLogin?: MouseEventHandler<HTMLButtonElement>;
}> = ({ onLogin }) => {
    return (
        <VStack>
            <Heading fontWeight={"normal"} fontSize={"2xl"}>
                Welcome to CEAP's Online Resources for Education
            </Heading>
            <VStack w={"full"}>
                <Button variant={"secondary"} onClick={onLogin}>
                    Login
                </Button>
                <Button variant={"primary"} as={"a"} href={"/registration"}>
                    Register
                </Button>
            </VStack>
        </VStack>
    );
};

export default PublicHome;
