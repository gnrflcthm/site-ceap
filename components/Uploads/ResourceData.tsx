import { FC, useContext, useState } from "react";
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

import type { UploadContentData } from "pages/upload_requests";
import { AccountType } from "@prisma/client";

const ResourceDataAdminOptions = dynamic(
    () => import("./ResourceDataAdminOptions")
);

const ResourceDataCEAPOptions = dynamic(
    () => import("./ResourceDataCEAPOptions")
);

const ResourceData: FC<{ resource: UploadContentData }> = ({ resource }) => {
    const [processing, setProcessing] = useState<boolean>(false);
    const toast = useToast();

    const { user } = useContext(AuthContext);

    const download = async () => {
        try {
            setProcessing(true);
            const { data } = await axios.get<{ downloadLink: string }>(
                `/api/resource/download/a/${resource.id}`
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
                <Text fontSize={textFontSize}>
                    {resource.uploadedBy?.displayName}
                </Text>
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
                        if (
                            ["CEAP_ADMIN", "CEAP_SUPER_ADMIN"].includes(
                                user.role
                            )
                        ) {
                            return (
                                <ResourceDataCEAPOptions
                                    onDownload={() => download()}
                                    onAccept={() => {}}
                                    onReject={() => {}}
                                />
                            );
                        }

                        if (user.role === AccountType.MS_ADMIN) {
                            return (
                                <ResourceDataAdminOptions
                                    onDownload={() => download()}
                                    onForward={() => {}}
                                    onReject={() => {}}
                                />
                            );
                        }
                    } else {
                        return <></>;
                    }
                })()}
            </Td>
        </Tr>
    );
};

export default ResourceData;
