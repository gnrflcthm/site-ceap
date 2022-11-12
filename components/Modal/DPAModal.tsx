import { Text } from "@chakra-ui/react";
import { FC } from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import Overlay from "./Overlay";

const DPAModal: FC<{ onDismiss: Function }> = ({ onDismiss }) => {
    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Data Privacy Notice"}
                    onDismiss={() => onDismiss()}
                />
                <Text p={"4"}>
                    Information collected in this form will be shared within the
                    CEAP community for the purpose of documentation and citation
                    for CEAP Online Resources Education. Your personal
                    information shall be treated as confidential in compliance
                    with the Data Privacy Act of 2012.
                </Text>
            </Modal>
        </Overlay>
    );
};

export default DPAModal;
