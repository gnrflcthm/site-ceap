import { FC, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Input,
    Progress,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import { GrClose } from "react-icons/gr";

const RequestUploadModal: FC<{ refetch: Function, close: Function }> = ({ refetch, close }) => {
    const [files, setFiles] = useState<File[] | undefined>(undefined);
    const [dragging, setDragging] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const toast = useToast();

    const [progress, setProgress] = useState<number>(0);

    console.log(files);

    const upload = async (e: FormEvent) => {
        e.preventDefault();

        setUploading(true);

        const formData = new FormData();

        if (files) {
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
        <Center
            h={"100vh"}
            w={"100vw"}
            bg={"blackAlpha.400"}
            zIndex={"modal"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close()}
        >
            <Flex
                onClick={(e) => e.stopPropagation()}
                flexDir={"column"}
                align={"stretch"}
                bg={"neutralizerLight"}
                rounded={"md"}
                p={"8"}
                w={"25%"}
            >
                <Flex justify={"flex-end"} mb={"2"}>
                    <Box
                        rounded={"md"}
                        cursor={"pointer"}
                        p={"2"}
                        _hover={{ bg: "gray.100", color: "red.500" }}
                        onClick={() => close()}
                    >
                        <Box as={GrClose} />
                    </Box>
                </Flex>
                <Heading mb={"4"} w={"full"} textAlign="center">
                    Request For Upload
                </Heading>
                <form onSubmit={upload}>
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
                            multiple
                            onDrop={(e) =>
                                setFiles(Array.from(e.dataTransfer.files))
                            }
                            onChange={(e) =>
                                setFiles(
                                    Array.from(e.currentTarget.files || [])
                                )
                            }
                            pointerEvents={uploading ? "none" : "auto"}
                        />

                        {files ? (
                            <VStack align={"flex-start"} w={"full"} p={"4"}>
                                {files.map((file, i) => (
                                    <Text
                                        key={i}
                                        w={"full"}
                                        overflow={"hidden"}
                                        textOverflow={"ellipsis"}
                                        whiteSpace={"nowrap"}
                                        fontWeight={"bold"}
                                    >
                                        {file.name}
                                    </Text>
                                ))}
                            </VStack>
                        ) : (
                            <Text>"Click or Drop Files To Upload"</Text>
                        )}
                    </Center>
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
                </form>
            </Flex>
        </Center>
    );
};

export default RequestUploadModal;
