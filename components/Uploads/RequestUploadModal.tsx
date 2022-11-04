import { FC, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Input,
    Progress,
    Stack,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";

import UploadBoxInput from "./UploadBoxInput";
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";

const RequestUploadModal: FC<{ refetch: Function; close: Function }> = ({
    refetch,
    close,
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const toast = useToast();

    const [progress, setProgress] = useState<number>(0);

    const upload = async (e: FormEvent) => {
        e.preventDefault();

        setUploading(true);

        const formData = new FormData();

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append("fileUpload", files[i]);
            }
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
    };

    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Request For Upload"}
                    onDismiss={() => close()}
                />
                <Box onSubmit={upload} p={"4"}>
                    <UploadBoxInput
                        files={files}
                        setFiles={setFiles}
                        processing={uploading}
                    />
                    <Text fontSize={"sm"} color={"gray.500"} mt={"2"}>
                        *Upon requesting for upload, the uploaded files will
                        initially be under review for approval by CEAP
                        Super-admins and Admins.
                    </Text>
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
                        >
                            Upload
                        </Button>
                    )}
                </Box>
            </Modal>
        </Overlay>
    );
};

export default RequestUploadModal;
