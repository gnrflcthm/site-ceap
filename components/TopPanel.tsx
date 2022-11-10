import { FC } from "react";
import {
    Flex,
    Heading,
    Button,
    Text,
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
    actionIsProcessing = false,
}) => {
    return (
        <Flex
            bg={"secondary"}
            p={{ base: "4", lg: "4" }}
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
                    px={'4'}
                    color={"neutralizerLight"}
                    onClick={() => onActionClick()}
                    m={"0"}
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
