import { VStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import Overlay from "./Overlay";

const UploadTermsModal: FC<{ onDismiss: Function }> = ({ onDismiss }) => {
    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Terms and Conditions"}
                    onDismiss={() => onDismiss()}
                />
                <VStack p={"4"} align={"stretch"}>
                    <Text>
                        Upon requesting for upload, the uploaded resources will
                        initially be{" "}
                        <b>
                            under review for approval by CEAP Super-admins and
                            Admins
                        </b>{" "}
                        and you will receive an e-mail message regarding your
                        pending upload.
                    </Text>
                    <Text>
                        If <b>REJECTED</b>, your resources will be{" "}
                        <b>removed from the system</b> and you will receive an
                        e-mail message regarding your request rejection.
                    </Text>
                    <Text>
                        If <b>ACCEPTED</b>, your resources will be{" "}
                        <b>made available to users of C.O.R.E.</b> according to
                        the File Accessibility set by CEAP:
                    </Text>
                    <VStack as={"ul"} pl={"8"} align={"start"}>
                        <Text as={"li"}>
                            <b>Public</b> - available to all users including
                            public users
                        </Text>
                        <Text as={"li"}>
                            <b>Private</b> - available only to all users with
                            C.O.R.E. accounts: Member School Users, Member
                            School Admins, CEAP Admins, and CEAP Super-admins.
                        </Text>
                        <Text as={"li"}>
                            <b>Hidden</b> - available only to CEAP Super-admins
                            and Admins.
                        </Text>
                    </VStack>
                </VStack>
            </Modal>
        </Overlay>
    );
};

export default UploadTermsModal;
