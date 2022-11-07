import { FC, useState, FormEvent, useEffect } from "react";
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import { IFolderSchema, IResourceSchema } from "@db/index";
import {
    Button,
    CircularProgress,
    HStack,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import {
    accessibilityValues,
    classifications,
    FolderType,
} from "@components/Uploads/AcceptResourceModal";
import { getFileClassification } from "@util/helper";
import axios, { AxiosError } from "axios";
import {
    FileAccessibility,
    FileClassification,
    ResourceStatus,
} from "@util/Enums";
import { useData } from "@util/hooks/useData";
import { AnimatePresence } from "framer-motion";
import FolderSelectModal from "@components/Uploads/FolderSelectModal";

const EditResourceModal: FC<{
    resource: IResourceSchema & { id: string; folder?: string };
    onDismiss: Function;
}> = ({ resource, onDismiss = () => {} }) => {
    const [filename, setFilename] = useState<string>(resource.filename);
    const [accessibility, setAccessibility] = useState<FileAccessibility>(
        resource.accessibility
    );
    const [classification, setClassification] = useState<FileClassification>(
        resource.classification || FileClassification.OTHERS
    );
    const [location, setLocation] = useState<
        (IFolderSchema & { id: string; root?: { id: string } }) | undefined
    >(undefined);

    const [status, setStatus] = useState<ResourceStatus>(resource.status);

    const { data: classFolders, isLoading: loadingClassFolders } = useData<
        FolderType[]
    >("/api/resource/classifications");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");
    const {
        isOpen: showFolderSelectModal,
        onClose: hideFolderSelectModal,
        onOpen: openFolderSelectModal,
    } = useDisclosure();

    const toast = useToast();

    const update = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios
            .patch(`/api/resource/a/update/${resource.id}`, {
                filename,
                accessibility,
                classification,
                status,
                folder: location?.id,
            })
            .then(() => {
                toast({
                    title: "Successfully Updated Resource",
                    status: "success",
                });
                onDismiss();
            })
            .catch((err: AxiosError) => {
                console.log(err);
                setError(err.response?.statusText);
            });
    };

    useEffect(() => {
        if (resource) {
            axios
                .get<IFolderSchema & { id: string; root: { id: string } }>(
                    `/api/resource/folders/${resource.folder}`
                )
                .then(({ data }) => {
                    setLocation(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [resource]);

    useEffect(() => {
        if (status && status === ResourceStatus.ARCHIVED) {
            setAccessibility(FileAccessibility.HIDDEN);
        }
    }, [status]);

    return (
        <>
            <Overlay>
                <Modal>
                    <ModalHeader
                        title="Edit Resource"
                        onDismiss={() => onDismiss()}
                    />
                    <form
                        onSubmit={update}
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
                                disabled={
                                    loading ||
                                    status === ResourceStatus.ARCHIVED
                                }
                                required
                            />
                            <CoreInput
                                value={status}
                                setValue={setStatus}
                                placeholder={"Resource Status"}
                                type={"select"}
                                values={[
                                    {
                                        name: "Available",
                                        value: ResourceStatus.APPROVED,
                                    },
                                    {
                                        name: "Archive",
                                        value: ResourceStatus.ARCHIVED,
                                    },
                                ]}
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
                                        // setBaseFolder(base);
                                        openFolderSelectModal();
                                    } else {
                                        setError("No Classification Selected.");
                                    }
                                }}
                                placeholder={"Folder Locatiion"}
                                required
                                disabled={loading || !location}
                            />
                        </VStack>
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
                                    "Save Changes"
                                )}
                            </Button>
                        </HStack>
                    </form>
                </Modal>
            </Overlay>
            <AnimatePresence>
                {showFolderSelectModal && (
                    <FolderSelectModal
                        base={location as FolderType}
                        onDismiss={hideFolderSelectModal}
                        onSelect={(folder: FolderType) => {
                            // setBaseFolder(folder);
                            setLocation(folder);
                            hideFolderSelectModal();
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default EditResourceModal;
