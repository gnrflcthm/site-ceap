import { FC } from "react";

import {
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Text,
    useToast,
} from "@chakra-ui/react";
import { FaEllipsisV, FaDownload, FaCheckCircle, FaBan } from "react-icons/fa";
import axios from "axios";
import { RequestStatus } from "@util/Enums";

const ResourceDataAdminOptions: FC<{
    resourceId: string;
    onDownload: Function;
    onForward?: Function;
    onReject: Function;
    isCurrent?: boolean;
    setProcessing: Function;
    resourceStatus: RequestStatus;
}> = ({
    resourceId,
    onDownload,
    onForward = () => {},
    onReject,
    isCurrent = false,
    setProcessing,
    resourceStatus,
}) => {
    const toast = useToast();

    const acceptAndForward = async () => {
        try {
            setProcessing(true);
            await axios.patch(`/api/resource/a/forward/${resourceId}`);
            toast({
                status: "success",
                title: "Successfully Forwarded Request To CEAP",
            });
            onForward();
        } catch (err) {
            console.log(err);
            toast({
                status: "error",
                title: "Error In Forwarding Request",
            });
        } finally {
            setProcessing(false);
        }
    };

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
                {!isCurrent && (
                    <MenuItem
                        onClick={() => acceptAndForward()}
                        color={"green.500"}
                    >
                        <Box as={FaCheckCircle} mr={"2"} />
                        <Text
                            fontSize={"md"}
                            lineHeight={"0"}
                            color={"inherit"}
                        >
                            Accept and Forward to CEAP
                        </Text>
                    </MenuItem>
                )}
                {resourceStatus !== RequestStatus.APPROVED && (
                    <MenuItem onClick={() => onReject()} color={"red.500"}>
                        <Box as={FaBan} mr={"2"} />
                        <Text
                            fontSize={"md"}
                            lineHeight={"0"}
                            color={"inherit"}
                        >
                            {isCurrent
                                ? "Cancel Upload Request"
                                : "Reject Upload Request"}
                        </Text>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};

export default ResourceDataAdminOptions;
