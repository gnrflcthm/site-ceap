import {
    Box,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { AuthContext } from "@context/AuthContext";
import { AccountType } from "@util/Enums";
import { motion } from "framer-motion";
import { FolderType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC, useContext } from "react";
import { FaEllipsisV, FaFolder } from "react-icons/fa";

const ListFolderItem: FC<{
    folder: FolderType;
    navigateFolder: Function;
    onRename: Function;
    onDelete: Function;
}> = ({ folder, navigateFolder, onRename, onDelete }) => {
    const { user } = useContext(AuthContext);

    return (
        <HStack
            as={motion.div}
            rounded={"md"}
            shadow={"md"}
            borderWidth={"thin"}
            borderColor={"gray.200"}
            w={"full"}
            justify={"space-between"}
            align={"stretch"}
            p={"4"}
            color={"neutralizerDark"}
            _hover={{
                color: "secondary",
            }}
            onClick={() => navigateFolder(folder.id)}
            cursor={"pointer"}
        >
            <HStack flex={"1"}>
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
                    justifySelf={"flex-start"}
                >
                    {folder.name}
                </Heading>
            </HStack>
            {user &&
                [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN].includes(
                    user.role as AccountType
                ) && (
                    <Flex
                        justifySelf={"flex-end"}
                        flexDir={"column"}
                        justify={"flex-start"}
                        align={"end"}
                        h={"full"}
                        w={"12"}
                    >
                        <Menu>
                            <MenuButton
                                h={"10"}
                                w={"8"}
                                rounded={"md"}
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
                                    color={"neutralizerDark"}
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
                    </Flex>
                )}
        </HStack>
    );
};

export default ListFolderItem;
