import { FC } from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";

const UserInfo: FC<{
    label?: string;
    value?: string;
    setValue?: Function;
    isEditable?: boolean;
}> = ({ label, value, isEditable = false }) => {
    return (
        <Flex justify={"space-between"} align={"center"} w={"full"}>
            <Heading fontSize={{ base: "md", lg: "xl" }} w={"fit-content"}>
                {label}
            </Heading>
            <Flex align={"center"} justify={"space-between"}>
                <Text color={isEditable ? "primary" : "neutralizerDark"}>
                    {value || "N/A"}
                </Text>
            </Flex>
        </Flex>
    );
};

export default UserInfo;
