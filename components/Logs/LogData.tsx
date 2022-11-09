import {
    Tr,
    Td,
    VStack,
    Heading,
    Text,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LogDataInfo } from "pages/logs";
import { FC } from "react";

const UserInfoModal = dynamic(() => import("@components/Modal/UserInfoModal"));

const LogData: FC<{
    log: LogDataInfo;
}> = ({ log }) => {
    const textFontSize = { base: "sm", md: "md" };
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Tr
                as={motion.tr}
                p={0}
                _hover={{
                    bg: "blackAlpha.50",
                }}
            >
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>
                        {new Date(log.datePerformed).toLocaleString()}
                    </Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Button
                        variant={"link"}
                        fontSize={textFontSize}
                        onClick={() => onOpen()}
                    >
                        {log.user.displayName}
                    </Button>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{log.action}</Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{log.details}</Text>
                </Td>
            </Tr>
            <AnimatePresence>
                {isOpen && (
                    <UserInfoModal
                        userId={log.user.id}
                        onDismiss={() => onClose()}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default LogData;
