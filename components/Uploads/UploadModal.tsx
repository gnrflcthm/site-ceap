import { FC, FormEvent, useEffect, useState } from "react";

import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import CoreInput from "@components/CoreInput";
import UploadBoxInput from "./UploadBoxInput";

import {
    Button,
    CircularProgress,
    useDisclosure,
    VStack,
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

const UploadModal: FC<{ onDismiss: Function }> = ({ onDismiss }) => {
    const [files, setFiles] = useState<File[]>([]);
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

    const [processing, setProcessing] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const {
        isOpen: showFolderSelectModal,
        onClose: hideFolderSelectModal,
        onOpen: openFolderSelectModal,
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

        const data = new FormData();

        for (let i of files) {
            data.append("fileUpload", i);
        }

        data.append("accessibility", accessibility);
        data.append("classification", classification);
        data.append("location", location?.id || "");

        axios
            .post("/api/admin/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: ({ loaded, total }: ProgressEvent) => {
                    setProgress((loaded / total) * 100);
                },
            })
            .then(() => {
                setProcessing(false);
            })
            .catch((err: AxiosError) => {
                setProcessing(false);
                setError(err.response?.statusText || "An Error Has Occured");
                setProcessing(false);
            });
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
                >
                    <UploadBoxInput {...{ files, setFiles, processing }} />
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
                            placeholder={"Folder Locatiion"}
                            required
                            disabled={processing}
                        />
                    )}
                    <Button
                        type={"submit"}
                        disabled={processing}
                        variant={"secondary"}
                    >
                        {processing ? (
                            <CircularProgress
                                isIndeterminate
                                color={"secondary"}
                                size={6}
                            />
                        ) : (
                            "Upload"
                        )}
                    </Button>
                </VStack>
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
            </AnimatePresence>
        </Overlay>
    );
};

export default UploadModal;
