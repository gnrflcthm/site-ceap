import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";

import { FC, FormEvent, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Flex,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const DeleteRejectPrompt: FC<{
    title: string;
    onDismiss: Function;
    action: "delete" | "reject";
    confirmText: string;
    prompt?: string;
    onConfirm: Function;
}> = ({ title, onDismiss, confirmText, prompt, onConfirm }) => {
    const [reason, setReason] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        onConfirm(reason);
    };

    return (
        <Overlay>
            <Modal>
                <ModalHeader title={title} onDismiss={() => onDismiss()} />
                <VStack
                    px={"8"}
                    py={"4"}
                    as={"form"}
                    onSubmit={handleSubmit}
                    id={"drPrompt"}
                    align={"start"}
                >
                    <Text w={"full"} whiteSpace={"normal"}>
                        {prompt}
                    </Text>
                    <AnimatePresence>
                        <Box mb={"1"} h={"1rem"}>
                            {reason && (
                                <Text
                                    as={motion.p}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    fontSize={"sm"}
                                    color={"secondary"}
                                    fontWeight={"normal"}
                                >
                                    OPTIONAL: Please specify your reason for
                                    this action.
                                </Text>
                            )}
                        </Box>
                    </AnimatePresence>
                    <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        borderWidth={"1px"}
                        borderColor={reason ? "secondary" : "neutralizerDark"}
                        focusBorderColor={"secondary"}
                        _hover={{ border: "neutralizerDark" }}
                        placeholder={
                            "OPTIONAL: Please specify your reason for this action."
                        }
                        maxH={"20vh"}
                        disabled={processing}
                    ></Textarea>
                </VStack>
                <Flex justify={"flex-end"} align={"center"} w={"full"} p={"4"}>
                    <Button
                        w={"fit-content"}
                        variant={"outline"}
                        mr={"2"}
                        onClick={() => onDismiss()}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        w={"fit-content"}
                        variant={"secondary"}
                        type={"submit"}
                        form={"drPrompt"}
                        disabled={processing}
                    >
                        {processing ? (
                            <CircularProgress
                                isIndeterminate
                                size={8}
                                color={"primary"}
                            />
                        ) : (
                            confirmText
                        )}
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default DeleteRejectPrompt;
