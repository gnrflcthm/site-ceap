import { FC, useState } from "react";
import { Center, Input, VStack, Text } from "@chakra-ui/react";

const UploadBoxInput: FC<{
    files: File[] | File | undefined;
    setFiles: Function;
    processing: boolean;
}> = ({ files, setFiles, processing }) => {
    const [dragging, setDragging] = useState<boolean>(false);
    return (
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
                onDrop={(e) => setFiles(Array.from(e.dataTransfer.files))}
                onChange={(e) =>
                    setFiles(Array.from(e.currentTarget.files || []))
                }
                display={processing ? "none" : "block"}
                pointerEvents={processing ? "none" : "auto"}
            />

            {(() => {
                if (!files) return <Text>"Click or Drop Files To Upload"</Text>;

                if (Array.isArray(files)) {
                    if (files.length === 0) {
                        return <Text>"Click or Drop Files To Upload"</Text>;
                    }
                    return (
                        <VStack
                            align={"flex-start"}
                            w={"full"}
                            p={"4"}
                            position={"relative"}
                            bg={"inherit"}
                        >
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
                    );
                }
                return (
                    <Text
                        w={"full"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        fontWeight={"bold"}
                    >
                        {files.name}
                    </Text>
                );
            })()}
        </Center>
    );
};

export default UploadBoxInput;
