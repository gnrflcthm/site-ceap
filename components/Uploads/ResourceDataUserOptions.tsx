import { FC } from "react";

import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Text,
} from "@chakra-ui/react";
import { FaEllipsisV, FaBan, FaDownload } from "react-icons/fa";

const ResourceDataUserOptions: FC<{
    onDownload: Function;
    onCancel: Function;
}> = ({ onDownload, onCancel }) => {
    return (
        <Menu>
            <MenuButton w={"full"}>
                <Box as={FaEllipsisV} m={"auto"} cursor={"pointer"} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => onDownload()} color={"blue.500"}>
                    <Box as={FaDownload} mr={"2"} />
                    <Text fontSize={"md"} lineHeight={"0"} color={"inherit"}>
                        Download
                    </Text>
                </MenuItem>
                <MenuItem onClick={() => onCancel()} color={"red.500"}>
                    <Box as={FaBan} mr={"2"} />
                    <Text fontSize={"md"} lineHeight={"0"} color={"inherit"}>
                        Cancel Upload Request
                    </Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ResourceDataUserOptions;
