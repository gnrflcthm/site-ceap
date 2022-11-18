import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FolderType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC } from "react";
import { FaFolder } from "react-icons/fa";

const ListFolderItem: FC<{
    folder: FolderType;
    navigateFolder: Function;
}> = ({ folder, navigateFolder }) => {
    return (
        <HStack
            as={motion.div}
            onViewportEnter={() => {}}
            rounded={"md"}
            shadow={"md"}
            borderWidth={"thin"}
            borderColor={"gray.200"}
            w={"full"}
            justify={"flex-start"}
            align={"stretch"}
            p={"4"}
            color={"neutralizerDark"}
            _hover={{
                color: "secondary",
            }}
            onClick={() => navigateFolder(folder.id)}
            cursor={"pointer"}
        >
            <Box
                as={FaFolder}
                w={"12"}
                h={"12"}
                mr={"2"}
                p={"2"}
                alignSelf={"center"}
            />
            <Heading
                alignSelf={"center"}
                fontSize={"2xl"}
                w={"60%"}
                color={"inherit"}
            >
                {folder.name}
            </Heading>
            <Flex
                flexDir={"column"}
                h={"full"}
                justifyContent={"center"}
                alignSelf={"center"}
            >
                {/* {isLoading ? (
                    <Text>Calculating...</Text>
                ) : (
                    <>
                        <Text>
                            <Box as={FaFolder} display={"inline"} mr={"2"} />{" "}
                            {data?.folderCount}
                        </Text>
                        <Text>
                            <Box as={FaFile} display={"inline"} mr={"2"} />{" "}
                            {data?.resourceCount}
                        </Text>
                    </>
                )} */}
            </Flex>
        </HStack>
    );
};

export default ListFolderItem;
