import {
    Box,
    Center,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { AuthContext } from "@context/AuthContext";
import { AccountType } from "@util/Enums";
import { FolderType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC, useContext } from "react";
import { FaEllipsisV, FaFolder } from "react-icons/fa";

const GridFolderItem: FC<{
    folder: FolderType;
    navigateFolder: Function;
    onRename: Function;
    onDelete: Function;
}> = ({ folder, navigateFolder, onRename, onDelete }) => {
    const { user } = useContext(AuthContext);
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
                w={{ base: "40", md: "12rem" }}
                _hover={{
                    borderColor: "secondary",
                }}
                onClick={() => navigateFolder(folder.id)}
            >
                {user &&
                    [
                        AccountType.CEAP_ADMIN,
                        AccountType.CEAP_SUPER_ADMIN,
                    ].includes(user.role as AccountType) && (
                        <Menu>
                            <MenuButton
                                pos={"absolute"}
                                top={"0"}
                                right={"0"}
                                h={"10"}
                                w={"8"}
                                _hover={{
                                    bg: "#00000044",
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Box
                                    as={FaEllipsisV}
                                    m={"auto"}
                                    cursor={"pointer"}
                                    fontSize={"xl"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    color={"neutralizerDark"}
                                    _hover={{ color: "secondary" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRename(folder);
                                    }}
                                >
                                    Rename
                                </MenuItem>
                                <MenuItem
                                    color={"neutralizerDark"}
                                    _hover={{ color: "secondary" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(folder);
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
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
