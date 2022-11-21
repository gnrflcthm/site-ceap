import { FC } from "react";

import { Grid, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FileUpload } from "./RequestUploadModal";
import { verifyFileType } from "@util/helper";
import { FaCog, FaTrash } from "react-icons/fa";

const FileUploadItem: FC<{
    file: FileUpload;
    onEdit: Function;
    onRemove: Function;
}> = ({ file, onEdit, onRemove }) => {
    return (
        <Grid
            w={"full"}
            _hover={{ bg: "blackAlpha.100" }}
            templateColumns={"60% 30% 10%"}
            p={"2"}
            alignItems={"center"}
        >
            <Text
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                fontWeight={"bold"}
            >
                {file.filename}
            </Text>
            <Text justifySelf={"center"}>{verifyFileType(file.filename)}</Text>
            <Flex justifySelf={"end"}>
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
            </Flex>
        </Grid>
    );
};

export default FileUploadItem;
