import { FC, useState } from "react";
import { Center, Input, VStack, Text } from "@chakra-ui/react";

const UploadBoxInput: FC<{
    files: File[];
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

            {files.length > 0 ? (
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
            ) : (
                <Text>"Click or Drop Files To Upload"</Text>
            )}
        </Center>
    );
};

export default UploadBoxInput;
