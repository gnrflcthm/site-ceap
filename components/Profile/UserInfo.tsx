import { FC } from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";

const UserInfo: FC<{ label?: string; value?: string }> = ({ label, value }) => {
    return (
        <Flex justify={"space-between"} align={"center"} w={"full"}>
            <Heading fontSize={"xl"}>{label}</Heading>
            <Text>{value}</Text>
        </Flex>
    );
};

export default UserInfo;
