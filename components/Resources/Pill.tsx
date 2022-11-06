import { FC } from "react";
import { Box, Text } from "@chakra-ui/react";

const Pill: FC<{
    name: string;
    onClick: Function;
    isActive: boolean;
}> = ({ name, onClick, isActive = false }) => {
    return (
        <Box
            as={"button"}
            onClick={() => onClick()}
            rounded={"full"}
            position={"relative"}
            bg={isActive ? "secondary" : "transparent"}
            px={"4"}
            py={"2"}
            _hover={{
                bg: "secondary",
            }}
            transition={"all 0.2s ease"}
            w={"fit-content"}
        >
            <Text color={"neutralizerLight"} fontWeight={"bold"} whiteSpace={"nowrap"}>
                {name}
            </Text>
        </Box>
    );
};

export default Pill;
