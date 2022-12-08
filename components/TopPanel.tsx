import { FC, ReactNode } from "react";
import {
    Flex,
    Heading,
    Button,
    Text,
    As,
    Box,
    Center,
    CircularProgress,
    Menu,
    MenuButton,
    MenuList,
    IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEllipsisV } from "react-icons/fa";

const TopPanel: FC<{
    title: string;
    hasAction?: boolean;
    hasMenu?: boolean;
    menuItems?: ReactNode;
    actionText?: string;
    onActionClick?: Function;
    actionIcon?: As;
    actionIsProcessing?: boolean;
}> = ({
    title,
    hasAction,
    hasMenu,
    menuItems,
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
            zIndex={"8"}
        >
            <Heading
                fontSize={{ base: "lg", lg: "2xl" }}
                color={"neutralizerLight"}
            >
                {title}
            </Heading>

            {hasAction && (
                <>
                    {(() => {
                        if (actionIsProcessing) {
                            return (
                                <Center>
                                    <CircularProgress
                                        isIndeterminate
                                        size={8}
                                        color={"primary"}
                                    />
                                </Center>
                            );
                        }
                        return (
                            <Button
                                variant={"transparent"}
                                px={{ base: "0", md: "4" }}
                                color={"neutralizerLight"}
                                onClick={() => onActionClick()}
                                m={"0"}
                            >
                                <Center
                                    as={motion.div}
                                    color={"inherit"}
                                    mr={actionText ? "2" : "0"}
                                >
                                    <Box as={actionIcon} color={"inherit"} />
                                </Center>{" "}
                                <Text as={"span"} color={"inherit"}>
                                    {actionText}
                                </Text>
                            </Button>
                        );
                    })()}
                </>
            )}
            {hasMenu && (
                <Menu>
                    <IconButton
                        as={MenuButton}
                        aria-label="expand menu"
                        icon={<FaEllipsisV />}
                        variant={"transparent"}
                        textAlign={"center"}
                        p={"auto"}
                    />
                    <MenuList zIndex={8} position={"relative"}>{menuItems}</MenuList>
                </Menu>
            )}
        </Flex>
    );
};

export default TopPanel;
