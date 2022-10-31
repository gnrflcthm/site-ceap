import { FC, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
    Td,
    Tr,
    Text,
    useToast,
    Center,
    CircularProgress,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

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

    const reject = async () => {
        setProcessing(true);
        try {
            await axios.delete(`/api/resource/a/cancel/${resource.id}`);
            toast({
                status: "success",
                title: "Successfully Removed Resource.",
            });
            refetch();
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

    const textFontSize = { base: "sm", md: "md" };
    return (
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
                <Text
                    as={"button"}
                    cursor={"pointer"}
                    onClick={download}
                    textDecor={"underline"}
                    color={"primary"}
                    fontSize={textFontSize}
                >
                    {resource.filename}
                </Text>
            </Td>
            <Td px={"4"} py={"2"}>
                <Text fontSize={textFontSize}>{resource.fileType}</Text>
            </Td>
            <Td px={"4"} py={"2"}>
                <Text fontSize={textFontSize}>{uploaderOrStatus}</Text>
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
                                        resourceId={resource.id}
                                        onDownload={() => download()}
                                        onAccept={() => onAccept(resource.id)}
                                        onReject={() => reject()}
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
                                        onReject={() => reject()}
                                        resourceStatus={resource.status}
                                    />
                                );
                            default:
                                return (
                                    <ResourceDataUserOptions
                                        onDownload={() => download()}
                                        onCancel={() => reject()}
                                    />
                                );
                        }
                    }
                })()}
            </Td>
        </Tr>
    );
};

export default ResourceData;
