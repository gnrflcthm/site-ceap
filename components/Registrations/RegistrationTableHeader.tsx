import { FC } from "react";

import { Tr, Th, Flex, Heading, Text, Center, Box } from "@chakra-ui/react";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const RegistrationTableHeader: FC<{
    heading: string;
    subheading?: string;
    sortable?: boolean;
    onClick?: () => {};
}> = ({ heading, subheading, sortable, onClick }) => {
    const headingFontSize = { base: "md", lg: "lg" };
    const textFontSize = { base: "sm", md: "md" };
    return (
        <Th
            py={"2"}
            px={"4"}
            onClick={onClick}
            cursor={sortable ? "pointer" : "initial"}
            borderRight={"3px solid"}
            borderRightColor={"white"}
        >
            <Flex>
                <Flex
                    flexDir={"column"}
                    justify={subheading ? "space-between" : "center"}
                    align={"flex-start"}
                    h={"full"}
                >
                    <Heading
                        fontSize={headingFontSize}
                        textTransform={"uppercase"}
                    >
                        {heading}
                    </Heading>
                    {subheading && (
                        <Text
                            fontSize={textFontSize}
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
                        ml={"4"}
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
