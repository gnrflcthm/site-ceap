import { FC, useState } from "react";

import {
    Center,
    Flex,
    Heading,
    Text,
    Button,
    CircularProgress,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const ConfirmationModal: FC<{
    title: string;
    prompt?: string;
    rejectText?: string;
    acceptText?: string;
    onReject?: Function;
    onAccept?: Function;
    willProcessOnAccept?: boolean;
}> = ({
    title,
    prompt,
    rejectText = "Reject",
    acceptText = "Accept",
    onReject = () => {},
    onAccept = () => {},
    willProcessOnAccept = false,
}) => {
    const [processing, setProcessing] = useState<boolean>(false);
    return (
        <Center
            h={"100vh"}
            w={"100vw"}
            bg={"blackAlpha.400"}
            zIndex={"modal"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Flex
                flexDir={"column"}
                bg={"neutralizerLight"}
                rounded={"md"}
                p={"8"}
            >
                <Heading mb={"4"}>{title}</Heading>
                {prompt && <Text mb={"4"}>{prompt}</Text>}
                <Flex justify={"flex-end"} align={"center"}>
                    <Button
                        bg={"red.500"}
                        fontWeight={"bold"}
                        color={"neutralizerLight"}
                        _hover={{ bg: "red.300" }}
                        w={"fit-content"}
                        onClick={() => onReject()}
                        mr={"4"}
                    >
                        {rejectText}
                    </Button>
                    <Button
                        bg={"green.500"}
                        fontWeight={"bold"}
                        color={"neutralizerLight"}
                        _hover={{ bg: "green.300" }}
                        w={"fit-content"}
                        onClick={() => {
                            if (willProcessOnAccept) setProcessing(true);
                            onAccept();
                        }}
                    >
                        {willProcessOnAccept && processing ? (
                            <CircularProgress size={8} isIndeterminate />
                        ) : (
                            acceptText
                        )}
                    </Button>
                </Flex>
            </Flex>
        </Center>
    );
};

export default ConfirmationModal;
