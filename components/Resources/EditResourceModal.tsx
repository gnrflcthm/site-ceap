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
    Text,
    Textarea,
    Box,
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
import { AnimatePresence, motion } from "framer-motion";
import FolderSelectModal from "@components/Uploads/FolderSelectModal";

const EditResourceModal: FC<{
    resource: IResourceSchema & { id: string; folder?: string };
    onDismiss: Function;
    refetch?: Function;
}> = ({ resource, onDismiss = () => {}, refetch = () => {} }) => {
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

    const [description, setDescription] = useState<string>(
        resource.description || ""
    );

    const [status, setStatus] = useState<ResourceStatus>(resource.status);

    const { data: classFolders, isLoading: loadingClassFolders } = useData<
        FolderType[]
    >("/api/resource/classifications");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
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
            .patch(`/api/resource/a/${resource.id}`, {
                filename,
                accessibility,
                classification,
                status,
                folder: location?.id,
                description,
            })
            .then(() => {
                toast({
                    title: "Successfully Updated Resource",
                    status: "success",
                });
                refetch();
                onDismiss();
            })
            .catch((err: AxiosError) => {
                console.log(err);
                setError(err.response?.statusText || "An error has occured.");
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

    useEffect(() => {
        if (!loadingClassFolders && classification) {
            const rootFolder = classFolders?.find(
                ({ name }) => name === getFileClassification(classification)
            );
            setLocation(rootFolder);
        }
    }, [loadingClassFolders, classification]);

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
                                placeholder={"Folder Location"}
                                required
                                disabled={loading || !location}
                            />
                            <Box w={"full"} position={"relative"}>
                                <AnimatePresence>
                                    <Box
                                        mb={"1"}
                                        h={"1rem"}
                                        w={"full"}
                                        position={"absolute"}
                                        top={"-1.5rem"}
                                    >
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
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    borderWidth={"1px"}
                                    borderColor={
                                        description
                                            ? "secondary"
                                            : "neutralizerDark"
                                    }
                                    focusBorderColor={"secondary"}
                                    _hover={{ border: "neutralizerDark" }}
                                    placeholder={"Enter file description"}
                                    maxH={"20vh"}
                                    disabled={loading}
                                ></Textarea>
                            </Box>
                        </VStack>
                        {error && (
                            <Text
                                w={"full"}
                                color={"red"}
                                textAlign={"center"}
                                mb={"2"}
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
