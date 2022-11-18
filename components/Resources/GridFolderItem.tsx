import {
    Box,
    Center,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { FolderType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC } from "react";
import { FaFolder } from "react-icons/fa";

const GridFolderItem: FC<{ folder: FolderType; navigateFolder: Function }> = ({
    folder,
    navigateFolder,
}) => {
    return (
        <Tooltip label={folder.name} placement={"top"}>
            <VStack
                position={"relative"}
                rounded={"md"}
                shadow={"md"}
                borderWidth={"thin"}
                borderColor={"gray.200"}
                p={"4"}
                flexDir={"column"}
                cursor={"pointer"}
                w={"12rem"}
                _hover={{
                    borderColor: "secondary",
                }}
                onClick={() => navigateFolder(folder.id)}
            >
                <Box
                    w={"full"}
                    _hover={{
                        color: "secondary",
                        borderColor: "secondary",
                    }}
                >
                    <Center mb={"4"}>
                        <Box
                            as={FaFolder}
                            w={"full"}
                            height={"16"}
                            color={"inherit"}
                        />
                    </Center>
                    <Text
                        fontSize={"xl"}
                        color={"inherit"}
                        textAlign={"center"}
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        w={"full"}
                        overflow={"hidden"}
                    >
                        {folder.name}
                    </Text>
                </Box>
            </VStack>
        </Tooltip>
    );
};

export default GridFolderItem;
