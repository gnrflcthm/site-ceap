import {
    Stack,
    GridItem,
    Box,
    Text,
    Input,
    As,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { FC, FormEvent, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { FolderType } from "./AcceptResourceModal";

const FolderItem: FC<{
    gridItem?: boolean;
    onClick?: Function;
    folder?: FolderType;
    createFolder?: Function;
    saveFolder?: Function;
    edit?: boolean;
    selected?: boolean;
    icon?: As;
    title?: string;
    onDoubleClick?: Function;
}> = ({
    gridItem = true,
    onClick = () => {},
    folder,
    createFolder = () => {},
    saveFolder = () => {},
    edit = false,
    selected = false,
    icon,
    title,
    onDoubleClick = () => {},
}) => {
    const [newFolderName, setNewFolderName] = useState<string>(
        folder?.name || ""
    );

    return (
        <Stack
            direction={gridItem ? "column" : "row"}
            p={gridItem ? "2" : "4"}
            align={"center"}
            as={GridItem}
            onClick={(e) => {
                e.stopPropagation();
                console.log(e.detail);
                switch (e.detail) {
                    case 1:
                        onClick();
                        break;
                    case 2:
                        onDoubleClick();
                        break;
                }
            }}
            w={"full"}
            overflow={"hidden"}
            borderBottom={gridItem ? "0" : "1px solid"}
            borderBottomColor={"blackAlpha.400"}
        >
            <Box
                as={icon || FaFolder}
                fontSize={"2rem"}
                color={selected ? "secondary" : "neutralizerDark"}
            />
            {!edit ? (
                <Text
                    color={selected ? "secondary" : "neutralizerDark"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    w={"full"}
                    textAlign={gridItem ? "center" : "start"}
                    userSelect={"none"}
                >
                    {folder?.name || title || ""}
                </Text>
            ) : (
                <form
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        //@ts-ignore
                        if (selected) {
                            saveFolder(newFolderName);
                        } else {
                            createFolder(newFolderName);
                        }
                    }}
                    id={"newFolderItem"}
                >
                    <Input
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        name={"folderName"}
                        type={"text"}
                        borderBottomWidth={"thin"}
                        borderBottomColor={"blackAlpha.500"}
                        focusBorderColor={"transparent"}
                        rounded={"none"}
                        _focus={{
                            borderBottomWidth: "thin",
                            borderBottomColor: "black",
                        }}
                        _hover={{}}
                        placeholder={"Folder Name"}
                        textAlign={"center"}
                    />
                    <input type="submit" hidden />
                </form>
            )}
        </Stack>
    );
};

export default FolderItem;
