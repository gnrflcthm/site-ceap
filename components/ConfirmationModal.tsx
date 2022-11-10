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
import Overlay from "./Modal/Overlay";
import Modal from "./Modal/Modal";
import ModalHeader from "./Modal/ModalHeader";

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
        <Overlay>
            <Modal>
                <ModalHeader
                    title={title}
                    {...{
                        onDismiss: processing ? undefined : () => onReject(),
                    }}
                />
                {prompt && (
                    <Text
                        p={"4"}
                        dangerouslySetInnerHTML={{ __html: prompt }}
                        w={"full"}
                        whiteSpace={"normal"}
                    ></Text>
                )}
                <Flex justify={"flex-end"} align={"center"} p={"4"}>
                    <Button
                        bg={"red.500"}
                        fontWeight={"bold"}
                        color={"neutralizerLight"}
                        _hover={{ bg: "red.300" }}
                        w={"fit-content"}
                        onClick={() => onReject()}
                        mr={"4"}
                        disabled={processing}
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
                        disabled={processing}
                    >
                        {willProcessOnAccept && processing ? (
                            <CircularProgress size={8} isIndeterminate />
                        ) : (
                            acceptText
                        )}
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default ConfirmationModal;
