import { FC } from "react";

import { Flex, Box, Heading } from "@chakra-ui/react";

const HomeSectionLabel: FC<{ label: string; color?: string }> = ({
    label,
    color = "secondary",
}) => {
    return (
        <Flex
            justify={"space-between"}
            align={"center"}
            zIndex={"2"}
            h={"full"}
        >
            <Box bg={color} w={"10"} h={"0.5"} rounded={"lg"} />
            <Heading
                textTransform={"uppercase"}
                fontSize={"md"}
                mx={"4"}
                color={color}
            >
                {label}
            </Heading>
            <Box bg={color} w={"10"} h={"0.5"} rounded={"lg"} />
        </Flex>
    );
};

export default HomeSectionLabel;
