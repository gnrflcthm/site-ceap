import { FC, useState, useEffect, useMemo, FormEvent } from "react";

import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import { Box, Button, Input, Textarea, Text, Center } from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import { AnimatePresence, motion } from "framer-motion";
import { FileUpload } from "./RequestUploadModal";

const AddFileModal: FC<{
    onDismiss: Function;
    onAdd: Function;
    update?: boolean;
    onUpdate?: Function;
    currentFile?: FileUpload;
}> = ({
    onDismiss,
    onAdd,
    update = false,
    currentFile,
    onUpdate = () => {},
}) => {
    const [file, setFile] = useState<File | null>(currentFile?.file || null);
    const [filename, setFilename] = useState<string>(
        currentFile?.filename || ""
    );
    const [description, setDescription] = useState<string>(
        currentFile?.description || ""
    );
    const [dragging, setDragging] = useState<boolean>(false);

    const ext = useMemo<string>(() => {
        if (file) {
            return file.name.substring(file.name.lastIndexOf("."));
        }
        return "";
    }, [file]);

    const addFile = (e: FormEvent) => {
        e.preventDefault();

        let fTemp = "";
        if (filename.trim().substring(filename.lastIndexOf(".")) === ext) {
            fTemp = filename;
        } else {
            fTemp = filename + ext;
        }

        const fileData = {
            file,
            filename: fTemp,
            description,
        };

        if (update) {
            onUpdate(fileData);
        } else {
            onAdd(fileData);
        }
    };

    useEffect(() => {
        if (file) {
            if (currentFile) {
                setFilename(currentFile.filename);
            } else {
                setFilename(file.name);
            }
        } else {
            setFilename("");
        }
    }, [file]);

    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={`${update ? "Update" : "Add"} File`}
                    onDismiss={() => onDismiss()}
                />
                <Box
                    as={"form"}
                    onSubmit={addFile}
                    id={"addFileForm"}
                    px={"4"}
                    py={"6"}
                >
                    <Center
                        h={"32"}
                        bg={"white"}
                        position={"relative"}
                        rounded={"md"}
                        transition={"all 0.2s"}
                        borderWidth={"thick"}
                        borderStyle={"dashed"}
                        borderColor={dragging ? "secondary" : "gray.400"}
                        fontWeight={"bold"}
                        _hover={{
                            borderColor: "secondary",
                        }}
                        overflow={"hidden"}
                        mb={"8"}
                    >
                        <Input
                            position={"absolute"}
                            h={"full"}
                            w={"full"}
                            type={"file"}
                            opacity={"0"}
                            onDragEnter={() => setDragging(true)}
                            onDragLeave={() => setDragging(false)}
                            cursor={"pointer"}
                            onDrop={(e) => setFile(e.dataTransfer.files[0])}
                            onChange={(e) => {
                                if (e.currentTarget.files)
                                    setFile(e.currentTarget.files[0]);
                            }}
                            required
                        />
                        <Text>
                            {file ? file.name : "Click Or Drag Files to Upload"}
                        </Text>
                    </Center>
                    <CoreInput
                        setValue={setFilename}
                        value={filename}
                        placeholder={"File Name"}
                        disabled={!file}
                        required
                    />
                    <Box w={"full"} mt={"4"}>
                        <AnimatePresence>
                            <Box mb={"1"} h={"1rem"}>
                                {description && (
                                    <Text
                                        as={motion.p}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        fontSize={"sm"}
                                        color={"secondary"}
                                        fontWeight={"normal"}
                                    >
                                        File Description
                                    </Text>
                                )}
                            </Box>
                        </AnimatePresence>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            borderWidth={"1px"}
                            borderColor={
                                description ? "secondary" : "neutralizerDark"
                            }
                            focusBorderColor={"secondary"}
                            _hover={{ border: "neutralizerDark" }}
                            placeholder={"Enter file description"}
                            maxH={"20vh"}
                        ></Textarea>
                    </Box>
                </Box>
                <Box w={"full"} p={"4"}>
                    <Button
                        type={"submit"}
                        form={"addFileForm"}
                        variant={"secondary"}
                    >
                        {update ? "Update File" : "Add File"}
                    </Button>
                </Box>
            </Modal>
        </Overlay>
    );
};

export default AddFileModal;
