import { FC, FormEvent, useState } from "react";
import Overlay from "./Overlay";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import {
    Button,
    CircularProgress,
    Flex,
    useToast,
    VStack,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import axios from "axios";

const FolderModal: FC<{
    id?: string;
    name?: string;
    mode?: "rename" | "";
    refetch?: Function;
    onDismiss: Function;
    baseFolderId: string;
}> = ({ id, refetch = () => {}, onDismiss, name = "", baseFolderId }) => {
    const toast = useToast();

    const [folderName, setFolderName] = useState<string>(name);
    const [processing, setProcessing] = useState<boolean>(false);

    const title = `${id ? "Rename" : "New"} Folder`;

    const saveFolder = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        if (id) {
            axios
                .patch(`/api/resource/folders/a/${id}`, {
                    name: folderName,
                })
                .then(() => {
                    toast({
                        status: "success",
                        title: "Folder Renamed Successfully",
                    });
                    refetch();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        status: "error",
                        title: "Error in Renaming Folder",
                    });
                })
                .finally(() => {
                    setProcessing(false);
                    onDismiss();
                });
        } else {
            axios
                .post("/api/resource/folders/new", {
                    root: baseFolderId,
                    name: folderName,
                })
                .then(() => {
                    toast({
                        status: "success",
                        title: "Folder Created Successfully",
                    });
                    refetch();
                })
                .catch((err) => {
                    console.log(err);
                    toast({
                        status: "error",
                        title: "Error in Creating Folder",
                    });
                })
                .finally(() => {
                    setProcessing(false);
                    onDismiss();
                });
        }
    };

    return (
        <Overlay>
            <Modal>
                <ModalHeader title={title} onDismiss={() => onDismiss()} />
                <VStack
                    px={"8"}
                    pt={"8"}
                    as={"form"}
                    id={"folderForm"}
                    onSubmit={saveFolder}
                >
                    <CoreInput
                        value={folderName}
                        setValue={setFolderName}
                        type={"text"}
                        placeholder={"Folder name"}
                        disabled={processing}
                    />
                </VStack>
                <Flex justify={"flex-end"} p={"4"}>
                    <Button
                        w={"fit-content"}
                        type={"submit"}
                        form={"folderForm"}
                        disabled={processing}
                    >
                        {processing ? (
                            <CircularProgress
                                isIndeterminate
                                size={8}
                                color={"primary"}
                            />
                        ) : (
                            <>{id ? "Save" : "Create"}</>
                        )}
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default FolderModal;
