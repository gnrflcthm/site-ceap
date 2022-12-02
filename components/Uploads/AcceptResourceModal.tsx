import {
    Button,
    Text,
    HStack,
    useDisclosure,
    VStack,
    useToast,
    CircularProgress,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import Overlay from "@components/Modal/Overlay";
import { IFolderSchema } from "@db/models";
import {
    FileAccessibility,
    FileClassification,
    ResourceStatus,
} from "@util/Enums";
import { getFileClassification } from "@util/helper";
import { SelectClassifications } from "@util/helper";
import { useData } from "@util/hooks/useData";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { IResourceDataType } from "./ResourceData";
import { FC, FormEvent, useEffect, useRef, useState } from "react";

import FolderSelectModal from "./FolderSelectModal";

export const accessibilityValues = [
    { name: "Hidden", value: FileAccessibility.HIDDEN },
    { name: "Public", value: FileAccessibility.PUBLIC },
    { name: "Private", value: FileAccessibility.PRIVATE },
];

export const classifications = Object.keys(SelectClassifications).map(
    (key) => ({
        name: key,
        value: SelectClassifications[key as keyof typeof SelectClassifications],
    })
);

export type FolderType = IFolderSchema & { id: string; root?: FolderType };

const AcceptResourceModal: FC<{
    reload: Function;
    resource?: IResourceDataType;
    close: Function;
}> = ({ resource, close, reload }) => {
    const [filename, setFilename] = useState<string>(resource?.filename || "");
    const [accessibility, setAccessibility] = useState<FileAccessibility>(
        FileAccessibility.PUBLIC
    );
    const [classification, setClassification] = useState<FileClassification>(
        FileClassification.CHRISTIAN_FORMATION
    );
    const [location, setLocation] = useState<FolderType | undefined>(undefined);

    const [baseFolder, setBaseFolder] = useState<FolderType | undefined>(
        undefined
    );

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const {
        isOpen: showFolderSelectModal,
        onClose: hideFolderSelectModal,
        onOpen: openFolderSelectModal,
    } = useDisclosure();

    const { data: classFolders, isLoading: loadingClassFolders } = useData<
        FolderType[]
    >("/api/resource/classifications");

    const toast = useToast();

    const publish = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!resource) {
            setError("No Resource Selected.");
            return;
        }

        try {
            await axios.patch(`/api/resource/a/${resource._id}`, {
                filename,
                accessibility,
                classification,
                folder: location?.id,
                status: ResourceStatus.APPROVED,
                accept: true,
            });
            reload();
            toast({
                status: "success",
                title: "Successfully Published Resource",
            });
            close();
        } catch (err) {
            console.log(err);
            setError("Error in updating Resource.");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (!loadingClassFolders && classification) {
            const rootFolder = classFolders?.find(
                ({ name }) => name === getFileClassification(classification)
            );
            setBaseFolder(rootFolder);
            setLocation(rootFolder);
        }
    }, [loadingClassFolders, classification]);

    return (
        <>
            <Overlay>
                <Modal>
                    <ModalHeader
                        title="Accept Resource"
                        onDismiss={() => close()}
                    />
                    <form
                        onSubmit={publish}
                        id={"resourceForm"}
                        onFocus={() => setError("")}
                    >
                        <VStack
                            spacing={"8"}
                            w={"full"}
                            py={"4"}
                            px={"6"}
                            mt={"4"}
                        >
                            <CoreInput
                                value={filename}
                                setValue={setFilename}
                                placeholder={"File Name"}
                                disabled={loading}
                                required
                            />
                            <CoreInput
                                value={accessibility}
                                setValue={setAccessibility}
                                placeholder={"File Accessibility"}
                                type={"select"}
                                values={accessibilityValues}
                                disabled={loading}
                                required
                            />
                            <CoreInput
                                value={classification}
                                setValue={(
                                    classification: FileClassification
                                ) => {
                                    setClassification(classification);
                                }}
                                placeholder={"File Classification"}
                                type={"select"}
                                values={classifications}
                                disabled={loading}
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
                                            setError(
                                                "No Classification Selected."
                                            );
                                        }
                                    }}
                                    placeholder={"Folder Location"}
                                    required
                                    disabled={loading}
                                />
                            )}
                        </VStack>
                    </form>
                    {error && (
                        <Text
                            as={"small"}
                            w={"full"}
                            textAlign={"center"}
                            color={"red.500"}
                        >
                            {error}
                        </Text>
                    )}
                    <HStack
                        justify={"flex-end"}
                        p={"2"}
                        py={"4"}
                        borderTopWidth={"thin"}
                        borderColor={"blackAlpha.200"}
                        bg={"secondary"}
                        roundedBottom={"md"}
                    >
                        <Button
                            onClick={() => close()}
                            type={"submit"}
                            variant={"light"}
                            w={"fit-content"}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            form={"resourceForm"}
                            w={"fit-content"}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress
                                    isIndeterminate
                                    size={6}
                                    color={"secondary"}
                                />
                            ) : (
                                "Publish"
                            )}
                        </Button>
                    </HStack>
                </Modal>
            </Overlay>
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
        </>
    );
};

export default AcceptResourceModal;
