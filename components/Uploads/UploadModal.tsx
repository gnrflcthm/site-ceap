import { FC, FormEvent, useEffect, useState } from "react";

import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import CoreInput from "@components/CoreInput";

import {
    Button,
    useDisclosure,
    VStack,
    Text,
    Flex,
    Box,
    Progress,
    useToast,
} from "@chakra-ui/react";

import {
    accessibilityValues,
    classifications,
    FolderType,
} from "./AcceptResourceModal";

import { getFileClassification } from "@util/helper";
import { FileAccessibility, FileClassification } from "@util/Enums";
import { useData } from "@util/hooks/useData";
import { AnimatePresence } from "framer-motion";
import FolderSelectModal from "./FolderSelectModal";
import axios, { AxiosError } from "axios";
import FileUploadItem from "./FileUploadItem";
import { FileUpload } from "./RequestUploadModal";
import dynamic from "next/dynamic";
import { FaFile } from "react-icons/fa";

const AddFileModal = dynamic(() => import("./AddFileModal"));

const UploadModal: FC<{ onDismiss: Function }> = ({ onDismiss }) => {
    const [files, setFiles] = useState<FileUpload[]>([]);
    const [accessibility, setAccessibility] = useState<FileAccessibility>(
        FileAccessibility.PUBLIC
    );
    const [classification, setClassification] = useState<FileClassification>(
        FileClassification.CHRISTIAN_FORMATION
    );

    const { data: classFolders, isLoading: loadingClassFolders } = useData<
        FolderType[]
    >("/api/resource/classifications");

    const [location, setLocation] = useState<FolderType | undefined>(undefined);

    const [baseFolder, setBaseFolder] = useState<FolderType | undefined>(
        undefined
    );

    const [current, setCurrent] = useState<number>(-1);

    const [processing, setProcessing] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const toast = useToast();

    const {
        isOpen: showFolderSelectModal,
        onClose: hideFolderSelectModal,
        onOpen: openFolderSelectModal,
    } = useDisclosure();

    const {
        isOpen: showAddFile,
        onOpen: openAddFile,
        onClose: closeAddFile,
    } = useDisclosure();

    useEffect(() => {
        if (!loadingClassFolders && classification) {
            const rootFolder = classFolders?.find(
                ({ name }) => name === getFileClassification(classification)
            );
            setBaseFolder(rootFolder);
            setLocation(rootFolder);
        }
    }, [loadingClassFolders, classification]);

    const upload = (e: FormEvent) => {
        e.preventDefault();

        setProcessing(true);

        const formData = new FormData();

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append(`fileUpload${i}`, files[i].file);
                formData.append(
                    `fileUpload${i}`,
                    JSON.stringify({
                        filename: files[i].filename,
                        description: files[i].description || "",
                        accessibility,
                        classification,
                        folder: location?.id || "",
                    })
                );
            }

            axios
                .post("/api/admin/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: ({ loaded, total }: ProgressEvent) => {
                        setProgress((loaded / total) * 100);
                    },
                })
                .then(() => {
                    setProcessing(false);
                    toast({
                        status: "success",
                        title: "Sucessfully Uploaded Files",
                    });
                    onDismiss();
                })
                .catch((err: AxiosError) => {
                    setProcessing(false);
                    setError(
                        err.response?.statusText || "An Error Has Occured"
                    );
                    setProcessing(false);
                });
        } else {
            setError("No Files Selected");
            setProcessing(false);
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
                    title={"Upload Resource"}
                    onDismiss={() => onDismiss()}
                />
                <VStack
                    as={"form"}
                    p={"4"}
                    align={"stretch"}
                    spacing={"8"}
                    onSubmit={upload}
                    id={"uploadForm"}
                >
                    <Flex justify={"end"} w={"full"}>
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
                                    onEdit={() => {
                                        onEdit(i);
                                    }}
                                    onRemove={() => {
                                        removeFile(i);
                                    }}
                                />
                            ))
                        ) : (
                            <Text>No Files Selected</Text>
                        )}
                    </VStack>
                    <CoreInput
                        value={accessibility}
                        setValue={setAccessibility}
                        placeholder={"File Accessibility"}
                        type={"select"}
                        values={accessibilityValues}
                        disabled={processing}
                        required
                    />
                    <CoreInput
                        value={classification}
                        setValue={(classification: FileClassification) => {
                            setClassification(classification);
                        }}
                        placeholder={"File Classification"}
                        type={"select"}
                        values={classifications}
                        disabled={processing}
                        required
                    />
                    {!loadingClassFolders && (
                        <CoreInput
                            readOnly
                            setValue={setLocation}
                            value={location?.fullPath || ""}
                            onClick={() => {
                                if (classification) {
                                    let base = classFolders?.find(
                                        (folder) =>
                                            folder.name ===
                                            getFileClassification(
                                                classification
                                            )
                                    );
                                    setBaseFolder(base);
                                    openFolderSelectModal();
                                } else {
                                    setError("No Classification Selected.");
                                }
                            }}
                            placeholder={"Folder Location"}
                            required
                            disabled={processing}
                        />
                    )}
                </VStack>
                {error && (
                    <Text w={"full"} color={"red"} textAlign={"center"}>
                        {error}
                    </Text>
                )}
                <Box p={"2"} w={"full"}>
                    {processing ? (
                        <Progress value={progress} color={"primary"} />
                    ) : (
                        <Button
                            type={"submit"}
                            variant={"secondary"}
                            form={"uploadForm"}
                        >
                            Upload
                        </Button>
                    )}
                </Box>
            </Modal>
            <AnimatePresence>
                {showFolderSelectModal && (
                    <FolderSelectModal
                        base={location || baseFolder}
                        onDismiss={hideFolderSelectModal}
                        onSelect={(folder: FolderType) => {
                            setBaseFolder(folder);
                            setLocation(folder);
                            hideFolderSelectModal();
                        }}
                    />
                )}
                {showAddFile && (
                    <AddFileModal
                        onAdd={(fileUpload: FileUpload) => {
                            setFiles((files) => [...files, fileUpload]);
                            closeAddFile();
                        }}
                        onDismiss={() => {
                            closeAddFile();
                            setCurrent(-1);
                        }}
                        update={current !== -1}
                        currentFile={
                            current !== -1 ? files[current] : undefined
                        }
                        onUpdate={current !== -1 ? updateFile : () => {}}
                    />
                )}
            </AnimatePresence>
        </Overlay>
    );
};

export default UploadModal;
