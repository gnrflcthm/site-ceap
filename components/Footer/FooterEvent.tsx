import { FC } from "react";

import { Flex, Heading, Text, VStack } from "@chakra-ui/react";

const FooterEvent: FC = () => {
    return (
        <Flex justify={"flex-start"}>
            <Flex
                flexDir={"column"}
                justify={"stretch"}
                align={"stretch"}
                bg={"secondary"}
            >
                <Text
                    m={"0"}
                    px={"4"}
                    textAlign={"center"}
                    bg={"blackAlpha.300"}
                >
                    Oct
                </Text>
                <Text
                    flex={"1"}
                    px={"4"}
                    textAlign={"center"}
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    lineHeight={"2"}
                >
                    31
                </Text>
            </Flex>
            <VStack flex={"1"} align={"start"} px={"10"}>
                <Heading fontSize={"sm"}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </Heading>
                <Text fontSize={"xs"}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sint, rerum amet ducimus ut eveniet rem.
                </Text>
            </VStack>
        </Flex>
    );
};

export default FooterEvent;
