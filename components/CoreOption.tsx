import { FC } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const CoreOption: FC<{ select: Function; label: string; value: string }> = ({
    select,
    label,
    value,
}) => {
    return (
        <Flex
            onClick={() => select(value)}
            _hover={{ bg: "gray.100" }}
            borderBottom={"1px solid"}
            borderColor={"gray.100"}
            w={"full"}
            p={"2"}
        >
            <Text>{label}</Text>
        </Flex>
    );
};

export default CoreOption;
