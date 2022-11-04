import { Flex, Heading, Box } from "@chakra-ui/react";
import { FC } from "react";
import { FaTimes } from "react-icons/fa";

const ModalHeader: FC<{ title: string; onDismiss?: Function }> = ({
    title,
    onDismiss,
}) => {
    return (
        <Flex
            justify={"space-between"}
            align={"center"}
            bg={"secondary"}
            p={"4"}
            roundedTop={"inherit"}
        >
            <Heading fontSize={"2xl"} color={"neutralizerLight"}>
                {title}
            </Heading>
            {onDismiss && (
                <Box
                    rounded={"md"}
                    cursor={"pointer"}
                    p={"2"}
                    _hover={{ bg: "whiteAlpha.200" }}
                    onClick={() => onDismiss()}
                    color={"neutralizerLight"}
                >
                    <Box as={FaTimes} color={"neutralizerLight"} />
                </Box>
            )}
        </Flex>
    );
};

export default ModalHeader;
