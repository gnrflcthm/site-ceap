import { FC } from "react";

import { Tr, Th, Flex, Heading, Text, Center, Box } from "@chakra-ui/react";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const RegistrationTableHeader: FC<{
    heading: string;
    subheading?: string;
    sortable?: boolean;
    onClick?: () => {};
}> = ({ heading, subheading, sortable, onClick }) => {
    return (
        <Th py={"2"} px={"4"} onClick={onClick} cursor={sortable ? "pointer" : "initial"} borderRight={"3px solid"} borderRightColor={"white"}>
            <Flex>
                <Flex
                    flexDir={"column"}
                    justify={subheading ? "space-between" : "center"}
                    align={"flex-start"}
                    h={"full"}
                >
                    <Heading
                        fontSize={"md"}
                        textTransform={"uppercase"}
                        fontWeight={"bold"}
                    >
                        {heading}
                    </Heading>
                    {subheading && (
                        <Text
                            fontSize={"sm"}
                            textTransform={"uppercase"}
                            fontWeight={"bold"}
                            color={"blackAlpha.600"}
                        >
                            {subheading}
                        </Text>
                    )}
                </Flex>
                {sortable && (
                    <Flex
                        flexDir={"column"}
                        justify={"center"}
                        align={"center"}
                        ml={'4'}
                    >
                        <Box as={FaCaretUp} />
                        <Box as={FaCaretDown} />
                    </Flex>
                )}
            </Flex>
        </Th>
    );
};

export default RegistrationTableHeader;
