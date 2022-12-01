import { FC, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import {
    Box,
    Button,
    Checkbox,
    Flex,
    Progress,
    Text,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";

import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import AddFileModal from "./AddFileModal";
import { FaFile } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import FileUploadItem from "./FileUploadItem";
import UploadTermsModal from "@components/Modal/UploadTermsModal";

export interface FileUpload {
    file: File;
    filename: string;
    description?: string;
}

const RequestUploadModal: FC<{ refetch: Function; close: Function }> = ({
    refetch,
    close,
}) => {
    const [files, setFiles] = useState<FileUpload[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const toast = useToast();

    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

    const [current, setCurrent] = useState<number>(-1);

    const [progress, setProgress] = useState<number>(0);

    const {
        isOpen: showAddFile,
        onOpen: openAddFile,
        onClose: closeAddFile,
    } = useDisclosure();

    const {
        isOpen: showTerms,
        onClose: closeTerms,
        onOpen: openTerms,
    } = useDisclosure();

    const upload = async (e: FormEvent) => {
        e.preventDefault();

        setUploading(true);

        const formData = new FormData();

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append(`fileUpload${i}`, files[i].file);
                formData.append(
                    `fileUpload${i}`,
                    JSON.stringify({
                        filename: files[i].filename,
                        description: files[i].description || "",
                    })
                );
            }

            axios
                .post("/api/member/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: ({ loaded, total }: ProgressEvent) => {
                        setProgress((loaded / total) * 100);
                    },
                })
                .then(() => {
                    toast({
                        status: "success",
                        title: "Upload Complete",
                    });
                    refetch();
                    close();
                })
                .catch((err: AxiosError) => {
                    setError(err.response?.statusText);
                    setUploading(false);
                });
        } else {
            setError("No Files Selected");
            setUploading(false);
        }
    };

    const onEdit = (i: number) => {
        setCurrent(i);
        openAddFile();
    };

    const updateFile = (file: FileUpload) => {
        setFiles((f) => {
            const temp = f;
            temp[current] = file;
            console.log(temp);
            return temp;
        });
        closeAddFile();
        setCurrent(-1);
    };

    const removeFile = (i: number) => {
        setFiles((temp) => temp.filter((f, idx) => idx !== i));
    };

    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Request For Upload"}
                    onDismiss={() => close()}
                />
                <Box as={"form"} onSubmit={upload} p={"4"}>
                    <Flex justify={"end"} mb={"2"}>
                        <Button w={"fit-content"} onClick={() => openAddFile()}>
                            <Box as={FaFile} mr={"4"} />
                            Add File
                        </Button>
                    </Flex>
                    <VStack
                        h={"30vh"}
                        overflowY={"auto"}
                        rounded={"md"}
                        border={"1px solid"}
                        borderColor={"neutralizerDark"}
                        justify={files.length > 0 ? "flex-start" : "center"}
                    >
                        {files.length > 0 ? (
                            files.map((file, i) => (
                                <FileUploadItem
                                    file={file}
                                    key={i}
                                    onEdit={() => onEdit(i)}
                                    onRemove={() => removeFile(i)}
                                />
                            ))
                        ) : (
                            <Text>No Files Selected</Text>
                        )}
                    </VStack>
                    <Checkbox
                        mt={"4"}
                        isChecked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                    >
                        I agree to the{" "}
                        <Button
                            variant={"link"}
                            display={"inline"}
                            onClick={() => openTerms()}
                        >
                            Terms and Conditions
                        </Button>{" "}
                        when uploading resources
                    </Checkbox>
                    {error && (
                        <Text color={"red"} fontWeight={"normal"} mt={"2"}>
                            {error}
                        </Text>
                    )}
                    {uploading ? (
                        <Progress value={progress} color={"primary"} />
                    ) : (
                        <Button
                            variant={"secondary"}
                            mt={error ? "2" : "4"}
                            type={"submit"}
                            disabled={files.length < 1 || !termsAgreed}
                        >
                            Upload
                        </Button>
                    )}
                </Box>
            </Modal>
            <AnimatePresence>
                {showAddFile && (
                    <AddFileModal
                        onAdd={(fileUpload: FileUpload) => {
                            setFiles((files) => [...files, fileUpload]);
                            closeAddFile();
                        }}
                        onDismiss={() => closeAddFile()}
                        update={current !== -1}
                        currentFile={
                            current !== -1 ? files[current] : undefined
                        }
                        onUpdate={current !== -1 ? updateFile : () => {}}
                    />
                )}
                {showTerms && <UploadTermsModal onDismiss={closeTerms} />}
            </AnimatePresence>
        </Overlay>
    );
};

export default RequestUploadModal;
