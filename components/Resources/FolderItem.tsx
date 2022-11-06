import { Box, Center, Tooltip, VStack, Text, GridItem } from "@chakra-ui/react";
import { IFolderSchema } from "@db/models";
import { FC } from "react";
import { FaFolder } from "react-icons/fa";

const FolderItem: FC<{
    folder: IFolderSchema & { id: string; root: string };
    onClick: Function;
}> = ({ folder, onClick }) => {
    return (
        <Tooltip label={folder.name}>
            <VStack
                position={"relative"}
                rounded={"md"}
                p={"4"}
                borderWidth={"thin"}
                borderColor={"neutralizerDark"}
                flexDir={"column"}
                cursor={"pointer"}
                _hover={{
                    color: "secondary",
                    borderColor: "secondary",
                }}
                onClick={() => onClick()}
                w={"12rem"}
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
            </VStack>
        </Tooltip>
    );
};

export default FolderItem;
