import { FC, useEffect, useState } from "react";

import React from "react";
import {
    Button,
    Center,
    Flex,
    Heading,
    Box,
    IconButton,
    HStack,
    VStack,
    Text,
    Grid,
    GridItem,
    Stack,
    CircularProgress,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
    FaFolderPlus,
    FaFolder,
    FaTrash,
    FaPencilAlt,
    FaBan,
    FaCheck,
} from "react-icons/fa";
import { BsGridFill, BsListUl, BsArrowBarUp } from "react-icons/bs";
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import FolderItem from "./FolderItem";
import { useData } from "@util/hooks/useData";
import axios from "axios";

import { FolderType } from "./AcceptResourceModal";

const FolderSelectModal: FC<{
    base?: FolderType;
    onDismiss?: Function;
    onSelect: Function;
}> = ({ base, onDismiss = () => {}, onSelect = () => {} }) => {
    const [baseFolder, setBaseFolder] = useState<FolderType | undefined>(base);

    const [mode, setMode] = useState<"normal" | "newFolder" | "rename">(
        "normal"
    );
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedFolder, setSelectedFolder] = useState<
        FolderType | undefined
    >(undefined);
    const [view, setView] = useState<"list" | "grid">("grid");

    const {
        data: folders,
        refetch,
        clear,
    } = useData<FolderType[]>(`/api/resource/folders/${baseFolder?.id}`);

    const createFolder = async (folderName: string) => {
        setLoading(true);
        try {
            await axios.post("/api/resource/folders/new", {
                root: baseFolder?.id,
                name: folderName,
            });
            refetch();
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
        setMode("normal");
    };

    const saveFolder = async (folderName: string) => {
        setLoading(true);
        try {
            await axios.patch(`/api/resource/folders/a/${selectedFolder?.id}`, {
                name: folderName,
            });
            refetch();
            setSelectedFolder(undefined);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
        setMode("normal");
    };

    const deleteFolder = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/resource/folders/a/${selectedFolder?.id}`);
            refetch();
            setSelectedFolder(undefined);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
        setMode("normal");
    };

    const navigateUp = async () => {
        const rootData = await axios.get<FolderType | null | undefined>(
            `/api/resource/folders/${baseFolder?.id}/root`
        );
        const root = rootData.data;
        if (root) {
            setBaseFolder(root);
        }
    };

    useEffect(() => {
        refetch();
        setSelectedFolder(undefined);
    }, [baseFolder]);

    return (
        <Overlay onClick={() => setSelectedFolder(undefined)}>
            <Modal>
                <ModalHeader title={"Select Folder"} onDismiss={onDismiss} />
                <Flex justify={"space-between"} align={"center"} px={"4"}>
                    <Flex>
                        {mode === "normal" &&
                            (() => {
                                if (selectedFolder) {
                                    return (
                                        <HStack>
                                            <Button
                                                onClick={() =>
                                                    setMode("rename")
                                                }
                                            >
                                                <Box
                                                    mr={"4"}
                                                    as={FaPencilAlt}
                                                />
                                                Rename
                                            </Button>
                                            <Button
                                                onClick={() => deleteFolder()}
                                            >
                                                <Box mr={"4"} as={FaTrash} />
                                                Delete
                                            </Button>
                                        </HStack>
                                    );
                                } else {
                                    return (
                                        <Button
                                            w={"fit-content"}
                                            onClick={() => setMode("newFolder")}
                                        >
                                            <Box mr={"4"} as={FaFolderPlus} />
                                            New Folder
                                        </Button>
                                    );
                                }
                            })()}
                        {["newFolder", "rename"].includes(mode) && (
                            <HStack>
                                <Button
                                    w={"fit-content"}
                                    onClick={() => {
                                        setMode("normal");
                                        setSelectedFolder(undefined);
                                    }}
                                    bg={"red.500"}
                                    color={"neutralizerLight"}
                                >
                                    <Box mr={"4"} as={FaBan} />
                                    Cancel
                                </Button>
                                {mode === "newFolder" && (
                                    <Button
                                        mr={"2"}
                                        w={"fit-content"}
                                        bg={"green.500"}
                                        color={"neutralizerLight"}
                                        type={"submit"}
                                        form={"newFolderItem"}
                                    >
                                        <Box mr={"4"} as={FaCheck} />
                                        Create Folder
                                    </Button>
                                )}
                            </HStack>
                        )}
                    </Flex>
                    <Flex>
                        <IconButton
                            icon={<BsGridFill />}
                            aria-label={"grid"}
                            w={"fit-content"}
                            rounded={"0"}
                            roundedLeft={"md"}
                            borderColor={"primary"}
                            color={
                                view === "grid"
                                    ? "neutralizerLight"
                                    : "neutralizerDark"
                            }
                            bg={view === "grid" ? "primary" : "transparent"}
                            onClick={() => setView("grid")}
                        />
                        <IconButton
                            icon={<BsListUl />}
                            aria-label={"list"}
                            w={"fit-content"}
                            rounded={"0"}
                            roundedRight={"md"}
                            borderColor={"primary"}
                            color={
                                view === "list"
                                    ? "neutralizerLight"
                                    : "neutralizerDark"
                            }
                            bg={view === "list" ? "primary" : "transparent"}
                            onClick={() => setView("list")}
                        />
                    </Flex>
                </Flex>
                <Grid
                    pos={"relative"}
                    templateColumns={`repeat(${view === "grid" ? 3 : 1}, 1fr)`}
                    gap={"2"}
                    placeItems={"start"}
                    justifyItems={view === "grid" ? "center" : "start"}
                    alignContent={"start"}
                    overflowY={"auto"}
                    minH={"30vh"}
                    maxH={"30vh"}
                    w={"full"}
                    bg={"blackAlpha.200"}
                    border={"1px solid"}
                    borderColor={"blackAlpha.100"}
                >
                    {baseFolder?.root && (
                        <FolderItem
                            gridItem={view === "grid"}
                            icon={BsArrowBarUp}
                            title={"Go Back"}
                            onDoubleClick={() => navigateUp()}
                        />
                    )}
                    {folders &&
                        (() => {
                            if (loading) {
                                return (
                                    <Center
                                        w={"full"}
                                        h={"full"}
                                        pos={"absolute"}
                                    >
                                        <CircularProgress
                                            isIndeterminate
                                            color={"primary"}
                                        />
                                    </Center>
                                );
                            }
                            return folders.map((folder) => (
                                <FolderItem
                                    onClick={() => {
                                        setSelectedFolder(folder);
                                    }}
                                    gridItem={view === "grid"}
                                    folder={folder}
                                    saveFolder={saveFolder}
                                    selected={folder.id === selectedFolder?.id}
                                    edit={
                                        folder.id === selectedFolder?.id &&
                                        mode === "rename"
                                    }
                                    onDoubleClick={() => {
                                        setBaseFolder(folder);
                                        clear();
                                    }}
                                />
                            ));
                        })()}
                    {mode === "newFolder" && !loading && (
                        <FolderItem
                            gridItem={view === "grid"}
                            folder={undefined}
                            createFolder={createFolder}
                            edit
                        />
                    )}
                </Grid>
                <Flex
                    justify={"space-between"}
                    align={"center"}
                    bg={"secondary"}
                    p={"4"}
                    roundedBottom={"md"}
                >
                    <Text color={"black"}>{baseFolder?.fullPath}</Text>
                    <Button
                        w={"fit-content"}
                        onClick={() => onSelect(selectedFolder || baseFolder)}
                    >
                        Select Folder
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default FolderSelectModal;
