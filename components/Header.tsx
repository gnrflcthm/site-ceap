import { FC } from "react";

import Image from "next/image";

import logo from "../public/logo.png";

import { Flex, Box, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Header: FC = () => {
    return (
        <>
            <Flex justifyContent={"center"} alignItems={"center"} py={"3"}>
                <Box position={"relative"} objectFit={"contain"} h={"full"} w={"10vw"}>
                    <Image src={logo} width={logo.width} height={logo.height} objectPosition={"center"} objectFit={"contain"} />
                </Box>
                <Heading w={"40%"} color={"primary"}>
                    Catholic Educational Association Of The Philippines
                </Heading>
            </Flex>
            <Navbar />
        </>
    );
};

export default Header;
