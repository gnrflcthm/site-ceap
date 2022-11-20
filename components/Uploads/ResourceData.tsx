import { FC, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
    Td,
    Tr,
    Text,
    useToast,
    Center,
    CircularProgress,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import axios from "axios";

import { AuthContext } from "@context/AuthContext";

import { IResourceSchema } from "@db/models";
import { AccountType } from "@util/Enums";

const ResourceDataAdminOptions = dynamic(
    () => import("./ResourceDataAdminOptions")
);

const ResourceDataCEAPOptions = dynamic(
    () => import("./ResourceDataCEAPOptions")
);

const ResourceDataUserOptions = dynamic(
    () => import("./ResourceDataUserOptions")
);

const UserInfoModal = dynamic(() => import("@components/Modal/UserInfoModal"));

const ResourceData: FC<{
    resource: IResourceSchema & {
        id: string;
        dateAdded: string;
        uploadedBy?: { id: string; displayName?: string };
    };
    onAccept?: (id: string) => void;
    showStatus?: boolean;
    refetch: Function;
}> = ({ resource, refetch, showStatus = false, onAccept = (id) => {} }) => {
    const [processing, setProcessing] = useState<boolean>(false);
    const toast = useToast();

    const download = async () => {
        try {
            setProcessing(true);
            const { data } = await axios.get<{ downloadLink: string }>(
                `/api/resource/a/download/${resource.id}`
            );

            const anchor = document.createElement("a");
            anchor.setAttribute("href", data.downloadLink);
            anchor.setAttribute("download", resource.filename);

            anchor.click();
        } catch (err) {
            console.log(err);
            toast({
                status: "error",
                title: "Error In Retrieving Resource",
            });
        } finally {
            setProcessing(false);
        }
    };

    const reject = async (isReject: boolean = false, refetchLink?: string) => {
        setProcessing(true);
        try {
            await axios.delete(
                `/api/resource/a/cancel/${resource.id}?action=${
                    isReject ? "reject" : "cancel"
                }`
            );
            toast({
                status: "success",
                title: "Successfully Removed Resource.",
            });
            if (refetchLink) {
                refetch(refetchLink);
            } else {
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast({
                status: "error",
                title: "Error In Removing Resource",
            });
        } finally {
            setProcessing(false);
        }
    };

    const { user } = useContext(AuthContext);

    const uploaderOrStatus = useMemo<string | undefined | null>(() => {
        if (!user) {
            return undefined;
        }

        if (showStatus) return resource.status;

        if (user.role === AccountType.MS_USER) {
            return resource.status;
        } else {
            return resource.uploadedBy?.displayName;
        }
    }, [user]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const textFontSize = { base: "sm", md: "md" };
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
                    <Text fontSize={textFontSize}>{resource.dateAdded}</Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Button
                        variant={"link"}
                        cursor={"pointer"}
                        onClick={download}
                        textDecor={"underline"}
                        color={"primary"}
                        fontSize={textFontSize}
                    >
                        {resource.filename}
                    </Button>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{resource.fileType}</Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    {(() => {
                        if (showStatus) {
                            return (
                                <Text fontSize={textFontSize}>
                                    {resource.status}
                                </Text>
                            );
                        } else {
                            return (
                                <Button
                                    variant={"link"}
                                    onClick={() => onOpen()}
                                >
                                    {resource.uploadedBy?.displayName}
                                </Button>
                            );
                        }
                    })()}
                </Td>
                <Td>
                    {(() => {
                        if (processing) {
                            return (
                                <Center>
                                    <CircularProgress
                                        isIndeterminate
                                        color={"primary"}
                                        size={6}
                                    />
                                </Center>
                            );
                        }

                        if (!processing && user) {
                            switch (user.role) {
                                case AccountType.CEAP_SUPER_ADMIN:
                                case AccountType.CEAP_ADMIN:
                                    return (
                                        <ResourceDataCEAPOptions
                                            isCurrent={showStatus}
                                            resourceId={resource.id}
                                            onDownload={() => download()}
                                            onAccept={() =>
                                                onAccept(resource.id)
                                            }
                                            onReject={reject}
                                        />
                                    );

                                case AccountType.MS_ADMIN:
                                    return (
                                        <ResourceDataAdminOptions
                                            setProcessing={setProcessing}
                                            isCurrent={showStatus}
                                            resourceId={resource.id}
                                            onDownload={() => download()}
                                            onForward={() => refetch()}
                                            onReject={reject}
                                            resourceStatus={resource.status}
                                        />
                                    );
                                default:
                                    return (
                                        <ResourceDataUserOptions
                                            onDownload={() => download()}
                                            onCancel={() => reject(false)}
                                        />
                                    );
                            }
                        }
                    })()}
                </Td>
            </Tr>
            <AnimatePresence>
                {isOpen && (
                    <UserInfoModal
                        userId={resource.uploadedBy?.id.toString() || ""}
                        onDismiss={() => onClose()}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ResourceData;
