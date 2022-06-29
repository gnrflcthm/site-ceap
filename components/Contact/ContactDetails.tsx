import { FC } from "react";

import {
    Box,
    Flex,
    VStack,
    HStack,
    Heading,
    Text,
    Link,
} from "@chakra-ui/react";

import {
    BsFillPinMapFill,
    BsFillTelephoneFill,
    BsFillEnvelopeFill,
    BsExclamationTriangle,
} from "react-icons/bs";

const ContactDetails: FC = () => {
    return (
        <VStack
            alignItems={"stretch"}
            spacing={"8"}
            px={"4"}
            w={"full"}
            py={"4"}
        >
            <HStack spacing={"8"} alignItems={"flex-start"}>
                <Box as={BsFillPinMapFill} fontSize={"4xl"} color={"primary"} />
                <Box flexBasis={"80%"}>
                    <Text fontWeight={"medium"}>
                        #7 Road 16 Brgy. Bagong Pag-Asa, Quezon City,
                        Philippines 1105
                    </Text>
                </Box>
            </HStack>
            <HStack spacing={"8"} alignItems={"flex-start"}>
                <Box
                    as={BsFillTelephoneFill}
                    fontSize={"4xl"}
                    color={"primary"}
                />
                <VStack
                    flexBasis={"80%"}
                    spacing={"2"}
                    alignItems={"flex-start"}
                >
                    <Box>
                        <Heading as={"h2"} fontSize={"2xl"} textAlign={"left"}>
                            <Box
                                as={BsExclamationTriangle}
                                display={"inline-block"}
                                fontSize={"inherit"}
                                my={"-0.5"}
                                mr={"2"}
                            />
                            Advisory
                        </Heading>
                        <Text>
                            Due to some technical difficulties, some of our
                            telephones lines are currently temporarily
                            unavailable. However, you may still reach us at the
                            following numbers:
                        </Text>
                    </Box>
                    <Box>
                        <Heading as={"h2"} fontSize={"2xl"}>
                            Landline:
                        </Heading>
                        <Text>(02) 8931-8811</Text>
                        <Text>(02) 8926-5153</Text>
                        <Text>(02) 8565-1564</Text>
                    </Box>
                    <Box>
                        <Heading as={"h2"} fontSize={"2xl"}>
                            Globe:
                        </Heading>
                        <Text>0966 940 3065</Text>
                    </Box>
                    <Box>
                        <Heading as={"h2"} fontSize={"2xl"}>
                            Smart:
                        </Heading>
                        <Text>0961 122 3464</Text>
                    </Box>
                    <Box>
                        <Heading as={"h2"} fontSize={"2xl"}>
                            Fax:
                        </Heading>
                        <Text>(02) 8426-2670</Text>
                    </Box>
                </VStack>
            </HStack>
            <HStack spacing={"8"} alignItems={"flex-start"}>
                <Box
                    as={BsFillEnvelopeFill}
                    fontSize={"4xl"}
                    color={"primary"}
                />
                <Box flexBasis={"80%"}>
                    <Link
                        href={"mailto:info@ceap.org.ph"}
                        fontSize={"lg"}
                        color={"blue.400"}
                    >
                        info@ceap.org.ph
                    </Link>
                </Box>
            </HStack>
        </VStack>
    );
};

export default ContactDetails;
