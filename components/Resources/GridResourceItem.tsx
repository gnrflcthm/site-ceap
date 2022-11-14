import {
    Tooltip,
    VStack,
    Menu,
    MenuButton,
    Center,
    HStack,
    Text,
    Box,
    As,
} from "@chakra-ui/react";
import { AuthContext } from "@context/AuthContext";
import { AccountType, FileType } from "@util/Enums";
import axios, { AxiosError } from "axios";
import { ResourceItemType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC, useContext } from "react";
import {
    FaEllipsisV,
    FaDownload,
    FaFileAlt,
    FaFileImage,
    FaFilePdf,
    FaFileVideo,
    FaFileAudio,
} from "react-icons/fa";
import CEAPMenuList from "./CEAPMenuList";
import UserMenuList from "./UserMenuList";

import { filesize } from "filesize";

const GridResourceItem: FC<{
    resource: ResourceItemType;
    reload: Function;
    onManage: Function;
}> = ({ resource, reload, onManage }) => {
    const { user } = useContext(AuthContext);

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
            case FileType.AUDIO:
                return FaFileAudio;
        }
    })();

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

    return (
        <Tooltip label={resource.filename} placement={"top"}>
            <VStack
                position={"relative"}
                rounded={"md"}
                shadow={"md"}
                borderWidth={"thin"}
                borderColor={"gray.200"}
                p={"4"}
                flexDir={"column"}
                cursor={"pointer"}
                w={"12rem"}
                _hover={{
                    borderColor: "secondary",
                }}
            >
                <Menu>
                    <MenuButton
                        pos={"absolute"}
                        top={"0"}
                        right={"0"}
                        h={"10"}
                        w={"8"}
                        _hover={{
                            bg: "#00000044",
                        }}
                    >
                        <Box
                            as={FaEllipsisV}
                            m={"auto"}
                            cursor={"pointer"}
                            fontSize={"xl"}
                        />
                    </MenuButton>
                    {(() => {
                        if (user) {
                            switch (user.role as AccountType) {
                                case AccountType.CEAP_ADMIN:
                                case AccountType.CEAP_SUPER_ADMIN:
                                    return (
                                        <CEAPMenuList
                                            onDownload={() => download()}
                                            onManage={onManage}
                                            resource={resource}
                                            reload={() => reload()}
                                        />
                                    );
                                default:
                                    return <UserMenuList
                                        onDownload={() => download()}
                                    />;
                            }
                        } else {
                            return (
                                <UserMenuList onDownload={() => download()} />
                            );
                        }
                    })()}
                </Menu>
                <Box
                    w={"full"}
                    _hover={{
                        color: "secondary",
                        borderColor: "secondary",
                    }}
                >
                    <Center mb={"4"}>
                        <Box
                            as={icon}
                            w={"full"}
                            height={"16"}
                            color={"inherit"}
                        />
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
                        <Text
                            color={"blackAlpha.700"}
                            textTransform={"uppercase"}
                        >
                            {resource.size &&
                                (filesize(resource.size) as string)}
                        </Text>
                        <Box as={FaDownload} color={"inherit"} />
                    </HStack>
                </Box>
            </VStack>
        </Tooltip>
    );
};

export default GridResourceItem;
