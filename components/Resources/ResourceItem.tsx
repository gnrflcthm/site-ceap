import { FC, useContext } from "react";

import {
    As,
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    HStack,
    Text,
    VStack,
    Tooltip,
} from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";

import axios, { AxiosError } from "axios";
import { AuthContext } from "@context/AuthContext";
import { ClientResourceType } from "pages/resources/search";

import { FaFileAlt, FaFileImage, FaFileVideo, FaFilePdf } from "react-icons/fa";
import { FileType } from "@util/Enums";

const ResourceItem: FC<{ resource: ClientResourceType }> = ({ resource }) => {
    const { user } = useContext(AuthContext);

    const download = () => {
        const url = `/api/resource${user ? "/a" : ""}/download/${resource.id}`;

        axios
            .get(url)
            .then((res) => {
                const data = res.data;

                const anchor = document.createElement("a");
                anchor.setAttribute("href", data.downloadLink);
                anchor.setAttribute("download", resource.filename);

                anchor.click();
            })
            .catch((err: AxiosError) => {
                console.log(err.response?.statusText);
            });
    };

    const icon: As = (() => {
        switch (resource.fileType) {
            case FileType.DOCUMENT:
                return FaFileAlt;
            case FileType.IMAGE:
                return FaFileImage;
            case FileType.PDF:
                return FaFilePdf;
            case FileType.VIDEO:
                return FaFileVideo;
        }
    })();

    let size = "";
    if (resource.size < 1000000) {
        size = `${(resource.size * Math.pow(10, -3)).toFixed(1)} KB`;
    } else {
        size = `${(resource.size * Math.pow(10, -6)).toFixed(1)} MB`;
    }

    return (
        <Tooltip label={resource.filename} placement={"top"}>
            <VStack
                position={"relative"}
                rounded={"md"}
                p={"4"}
                borderWidth={"thin"}
                borderColor={"neutralizerDark"}
                flexDir={"column"}
                cursor={"pointer"}
                _hover={{
                    color: "secondary",
                    borderColor: "secondary",
                }}
                onClick={() => download()}
                w={"12rem"}
            >
                <Center mb={"4"}>
                    <Box as={icon} w={"full"} height={"16"} color={"inherit"} />
                </Center>
                <Text
                    fontSize={"xl"}
                    color={"inherit"}
                    textAlign={"center"}
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    w={"full"}
                    overflow={"hidden"}
                >
                    {resource.filename}
                </Text>
                <HStack w={"full"} justify={"flex-end"}>
                    <Text color={"blackAlpha.700"} textTransform={"uppercase"}>
                        {size}
                    </Text>
                    <Box as={FaDownload} color={"inherit"} />
                </HStack>
            </VStack>
        </Tooltip>
    );
};

export default ResourceItem;
