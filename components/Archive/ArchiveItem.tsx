import {
    Td,
    Tr,
    Text,
    Button,
    useDisclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box,
    useToast,
    CircularProgress,
    Center,
} from "@chakra-ui/react";
import ConfirmationModal from "@components/ConfirmationModal";
import { IResourceSchema } from "@db/models";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArchiveType } from "pages/ceap/archive";
import { FC, useState } from "react";
import { FaCog, FaEllipsisV, FaTrash } from "react-icons/fa";

const UserInfoModal = dynamic(() => import("@components/Modal/UserInfoModal"));
const EditResourceModal = dynamic(
    () => import("@components/Resources/EditResourceModal")
);
const ResourceInfoModal = dynamic(
    () => import("@components/Resources/ResourceInfoModal")
);

const ArchiveItem: FC<{
    resource: ArchiveType;
    refetch: Function;
}> = ({ resource, refetch }) => {
    const textFontSize = { base: "sm", md: "md" };
    const toast = useToast();
    console.log(resource);
    const {
        isOpen: showUser,
        onOpen: openUser,
        onClose: closeUser,
    } = useDisclosure();

    const {
        isOpen: showEdit,
        onOpen: openEdit,
        onClose: closeEdit,
    } = useDisclosure();

    const {
        isOpen: showDelete,
        onOpen: openDelete,
        onClose: closeDelete,
    } = useDisclosure();

    const [processing, setProcessing] = useState<boolean>(false);

    const deleteItem = () => {
        axios
            .delete(`/api/resource/a/${resource._id}`)
            .then(() => {
                toast({
                    title: "Successfully Deleted Resource",
                    status: "success",
                });
                refetch();
            })
            .catch((err) =>
                toast({ title: "Error In Deleting Resource", status: "error" })
            )
            .finally(() => {
                closeDelete();
            });
    };

    const {
        isOpen: showResource,
        onOpen: openResource,
        onClose: closeResource,
    } = useDisclosure();

    return (
        <>
            <Tr
                as={motion.tr}
                p={0}
                _hover={{
                    bg: "blackAlpha.50",
                }}
            >
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>
                        {new Date(resource.dateAdded).toLocaleString()}
                    </Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text
                        onClick={() => openResource()}
                        fontSize={textFontSize}
                        color={"primary"}
                        w={"fit-content"}
                        _hover={{
                            color: "primaryAccent",
                            textDecor: "underline",
                        }}
                        fontWeight={"bold"}
                        cursor={"pointer"}
                        transition={"all 0.2s ease"}
                        overflowX={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        maxW={"42rem"}
                    >
                        {resource.filename}
                    </Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{resource.fileType}</Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Button
                        variant={"link"}
                        onClick={() => openUser()}
                        fontSize={textFontSize}
                        disabled={!resource.uploadedBy}
                    >
                        {resource.uploadedBy
                            ? `${resource.uploadedBy.displayName}`
                            : "DELETED USER"}
                    </Button>
                </Td>
                <Td px={"4"} py={"2"}>
                    {processing ? (
                        <Center>
                            <CircularProgress
                                isIndeterminate
                                size={6}
                                color={"secondary"}
                            />
                        </Center>
                    ) : (
                        <Menu>
                            <MenuButton w={"full"}>
                                <Box
                                    as={FaEllipsisV}
                                    m={"auto"}
                                    cursor={"pointer"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => openEdit()}>
                                    <Box as={FaCog} mr={"2"} />
                                    <Text fontSize={"md"} lineHeight={"0"}>
                                        Manage
                                    </Text>
                                </MenuItem>
                                <MenuItem onClick={() => openDelete()}>
                                    <Box as={FaTrash} mr={"2"} />
                                    <Text fontSize={"md"} lineHeight={"0"}>
                                        Delete
                                    </Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Td>
            </Tr>
            <AnimatePresence>
                {showUser && (
                    <UserInfoModal
                        userId={resource.uploadedBy._id}
                        onDismiss={() => closeUser()}
                    />
                )}
                {showEdit && (
                    <EditResourceModal
                        resource={
                            resource as unknown as IResourceSchema & {
                                id: string;
                                _id: string;
                                folder?: string;
                            }
                        }
                        onDismiss={() => closeEdit()}
                    />
                )}
                {showDelete && (
                    <ConfirmationModal
                        title={"Delete Resource"}
                        acceptText={"Delete"}
                        rejectText={"Cancel"}
                        prompt={`You are about to delete <b>${resource.filename}</b>. Do you want to proceed?`}
                        onReject={() => closeDelete()}
                        onAccept={() => deleteItem()}
                        willProcessOnAccept={true}
                    />
                )}
                {showResource && (
                    <ResourceInfoModal
                        onDismiss={() => closeResource()}
                        resourceId={resource._id}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ArchiveItem;
