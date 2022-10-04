import { FC } from "react";
import {
    Flex,
    Heading,
    Button,
    Text,
    CircularProgress,
    As,
    Box,
    Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const TopPanel: FC<{
    title: string;
    hasAction?: boolean;
    actionText?: string;
    onActionClick?: Function;
    actionIcon?: As;
    actionIsProcessing?: boolean;
}> = ({
    title,
    hasAction,
    actionText,
    onActionClick = () => {},
    actionIcon,
    actionIsProcessing = true,
}) => {
    return (
        <Flex
            bg={"secondary"}
            p={{ base: "2", lg: "4" }}
            position={"sticky"}
            top={"0"}
            justify={"space-between"}
            align={"center"}
        >
            <Heading
                fontSize={{ base: "lg", lg: "2xl" }}
                color={"neutralizerLight"}
            >
                {title}
            </Heading>

            {hasAction && (
                <Button
                    variant={"transparent"}
                    p={"0"}
                    color={"neutralizerLight"}
                    onClick={() => onActionClick()}
                >
                    <Center
                        as={motion.div}
                        color={"inherit"}
                        mr={"2"}
                    >
                        <Box as={actionIcon} color={"inherit"} />
                    </Center>{" "}
                    <Text as={"span"} color={"inherit"}>
                        {actionText}
                    </Text>
                </Button>
            )}
        </Flex>
    );
};

export default TopPanel;
