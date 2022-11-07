import { FC, useContext } from "react";

import {
    As,
    Box,
    Center,
    HStack,
    Text,
    VStack,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
} from "@chakra-ui/react";
import { FaDownload, FaEllipsisV } from "react-icons/fa";

import axios, { AxiosError } from "axios";
import { AuthContext } from "@context/AuthContext";
import { ClientResourceType } from "pages/resources/search";

import { FaFileAlt, FaFileImage, FaFileVideo, FaFilePdf } from "react-icons/fa";
import { AccountType, FileType } from "@util/Enums";
import dynamic from "next/dynamic";
import { IResourceSchema } from "@db/models";

const UserMenuList = dynamic(
    () => import("@components/Resources/UserMenuList")
);

const CEAPMenuList = dynamic(
    () => import("@components/Resources/CEAPMenuList")
);

const ResourceItem: FC<{
    resource: IResourceSchema & {
        id: string;
        uploadedBy: string;
        folder: string;
    };
    reload: Function;
    onManage: Function;
}> = ({ resource, reload, onManage }) => {
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
    if (resource.size) {
        if (resource.size < 1000000) {
            size = `${(resource.size * Math.pow(10, -3)).toFixed(1)} KB`;
        } else {
            size = `${(resource.size * Math.pow(10, -6)).toFixed(1)} MB`;
        }
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
                                            resource={
                                                resource as IResourceSchema & {
                                                    id: string;
                                                    uploadedBy: string;
                                                    folder: string;
                                                }
                                            }
                                            reload={() => reload()}
                                        />
                                    );
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
                    // onClick={() => download()}
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
                            {size}
                        </Text>
                        <Box as={FaDownload} color={"inherit"} />
                    </HStack>
                </Box>
            </VStack>
        </Tooltip>
    );
};

export default ResourceItem;
