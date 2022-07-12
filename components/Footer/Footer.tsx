import { FC } from "react";

import Image from "next/image";

import { Flex, Link, Text, VStack, Box, Heading } from "@chakra-ui/react";
import { FaFax, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import logo from "../../public/logo.png";
import FooterEvent from "./FooterEvent";

const Footer: FC = () => {
    return (
        <VStack bg={"primary"} color={"neutralizerLight"} p={"10"}>
            <Flex
                justify={"space-between"}
                w={"full"}
                borderBottom={"1px"}
                borderBottomColor={"whiteAlpha.500"}
                pb={"8"}
            >
                <Flex flexBasis={"50%"} justify={"center"} align={"center"}>
                    <VStack w={"60%"} align={"flex-start"}>
                        <Flex alignSelf={"center"} mb={"4"}>
                            <Box
                                position={"relative"}
                                objectFit={"contain"}
                                p={"4"}
                            >
                                <Image
                                    src={logo}
                                    layout={"fill"}
                                    objectFit={"cover"}
                                />
                            </Box>
                            <Heading ml={"2"}>CEAP</Heading>
                        </Flex>
                        <Flex
                            justify={"space-between"}
                            align={"space-between"}
                            fontSize={"sm"}
                        >
                            <Box
                                as={FaMapMarkerAlt}
                                fontSize={"4xl"}
                                p={"2"}
                                mr={"2"}
                            />
                            <Text ml={"2"}>
                                #7 Road 16 Brgy. Bagong Pag-Asa, Quezon City,
                                Philippines 1105
                            </Text>
                        </Flex>
                        <Flex
                            justify={"space-between"}
                            align={"space-between"}
                            fontSize={"sm"}
                        >
                            <Box as={FaEnvelope} fontSize={"4xl"} p={"2"} />
                            <Text ml={"2"}>info@ceap.org.ph</Text>
                        </Flex>
                        <Flex
                            justify={"space-between"}
                            align={"space-between"}
                            fontSize={"sm"}
                        >
                            <Box as={FaFax} fontSize={"4xl"} p={"2"} />
                            <Text ml={"2"}>(02) 8426-2670</Text>
                        </Flex>
                    </VStack>
                </Flex>
                <VStack flexBasis={"50%"} align={"stretch"}>
                    <Heading textAlign={"start"} fontSize={'xl'} mb={'2'}>Upcoming Events</Heading>
                    <FooterEvent />
                    <FooterEvent />
                    <FooterEvent />
                    <FooterEvent />
                </VStack>
            </Flex>
            <Flex
                justify={"space-between"}
                align={"center"}
                mt={"8"}
                w={"full"}
                fontSize={"sm"}
                px={'2'}
            >
                <Text>
                    Copyright 2020 Catholic Educational Association of the
                    Philippines
                </Text>
                <Link>Privacy Policy</Link>
            </Flex>
        </VStack>
    );
};

export default Footer;
