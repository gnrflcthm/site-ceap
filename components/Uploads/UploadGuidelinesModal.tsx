import { FC } from "react";
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import { Text, VStack } from "@chakra-ui/react";

const UploadGuidelinesModal: FC<{ onDismiss: Function }> = ({ onDismiss }) => {
    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title="Uploading Guidelines"
                    onDismiss={() => onDismiss()}
                />
                <VStack as={"ol"} pr={'4'} pl={'8'} py={'4'} align={"flex-start"} maxH={"60vh"} overflow={"auto"}>
                    <Text as={"li"}><b>Click the Upload box</b> and select a file from your device or <b>drag and drop your file</b> into it.</Text>
                    <Text as={"li"}>The <b>supported files and file extensions</b> that can be uploaded are the following:</Text>
                    <VStack as={"ul"} w={'full'} align={"flex-start"} px={"8"}>
                        <Text as={'li'}><b>PDF</b> - .pdf</Text>
                        <Text as={'li'}><b>IMAGE</b> - .jpeg, .jpg, .png </Text>
                        <Text as={'li'}><b>VIDEO</b> - .mp4, .mov, .avi</Text>
                        <Text as={'li'}><b>AUDIO</b> - .mp3</Text>
                        <Text as={'li'}><b>DOCUMENT</b> - .doc, .docx, .ppt, .pptx, .xls, .xlsx</Text>
                    </VStack>
                    <Text as={"li"}>When a file has been selected, please <b>make sure that the file name is appropriate</b>. You may change it in the textbox.</Text>
                    <Text as={"li"}>Please also <b>enter a specific description regarding the contents of your file</b>.</Text>
                    <Text as={"li"}>Once done, <b>click Add File</b> to add it to the Request for Upload form.</Text>
                    <Text as={"li"}><b>You may add several files</b> before uploading but just <b>make sure to follow these guidelines</b>.</Text>
                </VStack>
            </Modal>
        </Overlay>
    );
};

export default UploadGuidelinesModal;
