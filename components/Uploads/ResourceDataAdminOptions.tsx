import { FC } from "react";

import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Text,
} from "@chakra-ui/react";
import { FaEllipsisV, FaPencilAlt, FaTrash } from "react-icons/fa";

const ResourceDataAdminOptions: FC<{
    onDownload: Function;
    onForward: Function;
    onReject: Function;
}> = ({ onDownload, onForward, onReject }) => {
    // TODO: Fixed Menu Item Icons

    return (
        <Menu>
            <MenuButton w={"full"}>
                <Box as={FaEllipsisV} m={"auto"} cursor={"pointer"} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => onDownload()}>
                    <Box as={FaPencilAlt} mr={"2"} />
                    <Text fontSize={"md"} lineHeight={"0"}>
                        Download
                    </Text>
                </MenuItem>
                <MenuItem onClick={() => onForward()}>
                    <Box as={FaPencilAlt} mr={"2"} />
                    <Text fontSize={"md"} lineHeight={"0"}>
                        Accept and Forward to CEAP
                    </Text>
                </MenuItem>
                <MenuItem onClick={() => onReject()}>
                    <Box as={FaPencilAlt} mr={"2"} />
                    <Text fontSize={"md"} lineHeight={"0"}>
                        Reject
                    </Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ResourceDataAdminOptions;
