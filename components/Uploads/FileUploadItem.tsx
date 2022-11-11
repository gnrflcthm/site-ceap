import { FC } from "react";

import { Box, Flex, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FileUpload } from "./RequestUploadModal";
import { verifyFileType } from "@util/helper";
import { FaCog, FaTrash } from "react-icons/fa";

const FileUploadItem: FC<{
    file: FileUpload;
    onEdit: Function;
    onRemove: Function;
}> = ({ file, onEdit, onRemove }) => {
    return (
        <Flex w={"full"} p={"2"} _hover={{ bg: "blackAlpha.100" }}>
            <HStack flex={"1"}>
                <Text
                    w={"70%"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                >
                    {file.filename}
                </Text>
                <Text>{verifyFileType(file.filename)}</Text>
            </HStack>
            <HStack>
                <Tooltip label={"Edit"}>
                    <IconButton
                        color={"primary"}
                        aria-label={"Edit"}
                        icon={<FaCog />}
                        variant={"transparent"}
                        onClick={() => onEdit()}
                    />
                </Tooltip>
                <Tooltip label={"Remove"}>
                    <IconButton
                        color={"primary"}
                        aria-label={"Remove"}
                        icon={<FaTrash />}
                        variant={"transparent"}
                        onClick={() => onRemove()}
                    />
                </Tooltip>
            </HStack>
        </Flex>
    );
};

export default FileUploadItem;
