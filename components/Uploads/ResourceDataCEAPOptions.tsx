import { FC } from "react";

import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Text,
} from "@chakra-ui/react";
import {
    FaEllipsisV,
    FaCheckCircle,
    FaTimesCircle,
    FaDownload,
} from "react-icons/fa";

const ResourceDataCEAPOptions: FC<{
    isCurrent: boolean;
    resourceId: string;
    onDownload: Function;
    onAccept: Function;
    onReject: Function;
}> = ({ isCurrent, onDownload, onAccept, onReject }) => {
    // TODO: Fixed Menu Item Icons

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
                {isCurrent ? (
                    <MenuItem onClick={() => onReject(false, "/api/resource/a/requests")} color={"red.500"}>
                        <Box as={FaTimesCircle} mr={"2"} />
                        <Text
                            fontSize={"md"}
                            lineHeight={"0"}
                            color={"inherit"}
                        >
                            Delete Resource
                        </Text>
                    </MenuItem>
                ) : (
                    <>
                        <MenuItem
                            onClick={() => onAccept()}
                            color={"green.500"}
                        >
                            <Box as={FaCheckCircle} mr={"2"} />
                            <Text
                                fontSize={"md"}
                                lineHeight={"0"}
                                color={"inherit"}
                            >
                                Accept
                            </Text>
                        </MenuItem>
                        <MenuItem onClick={() => onReject(true, "/api/resource/a/requests")} color={"red.500"}>
                            <Box as={FaTimesCircle} mr={"2"} />
                            <Text
                                fontSize={"md"}
                                lineHeight={"0"}
                                color={"inherit"}
                            >
                                Reject
                            </Text>
                        </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    );
};

export default ResourceDataCEAPOptions;
