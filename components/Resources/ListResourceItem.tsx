import { FC, useContext } from "react";

import {
    As,
    Box,
    Flex,
    Heading,
    Menu,
    MenuButton,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { ResourceItemType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { AccountType, FileType } from "@util/Enums";
import {
    FaEllipsisV,
    FaFileAlt,
    FaFileImage,
    FaFilePdf,
    FaFileVideo,
    FaUser,
} from "react-icons/fa";
import CEAPMenuList from "./CEAPMenuList";
import UserMenuList from "./UserMenuList";
import { AuthContext } from "@context/AuthContext";
import axios, { AxiosError } from "axios";
import { filesize } from "filesize";

const ListResourceItem: FC<{
    resource: ResourceItemType;
    reload: Function;
    onManage: Function;
    onView: Function;
}> = ({ resource, reload, onManage, onView }) => {
    const { user } = useContext(AuthContext);

    const authorDetails: string = (() => {
        if (resource.uploadedBy && resource.memberSchool) {
            const { firstName, lastName } = resource.uploadedBy;
            const { name } = resource.memberSchool;
            return `${firstName} ${lastName} - ${name}`;
        }

        if (resource.uploadedBy && !resource.memberSchool) {
            const { firstName, lastName } = resource.uploadedBy;
            return `${firstName} ${lastName}`;
        }

        if (!resource.uploadedBy && resource.memberSchool) {
            return resource.memberSchool.name;
        }

        return "DELETED USER";
    })();

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

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex
                w={"full"}
                rounded={"md"}
                shadow={"md"}
                borderWidth={"thin"}
                borderColor={"gray.200"}
                p={"4"}
                color={"neutralizerDark"}
                _hover={{ color: "secondary" }}
                cursor={"pointer"}
                onClick={() => onView(resource)}
            >
                <Box
                    as={icon}
                    mr={"2"}
                    alignSelf={"start"}
                    pt={"1"}
                    w={"12"}
                    h={"12"}
                    color={"inherit"}
                />
                <Flex
                    flexDir={"column"}
                    h={"full"}
                    w={"60%"}
                    flex={"1"}
                    mr={"8"}
                >
                    <Box mb={"2"} w={"full"}>
                        <Flex>
                            <Heading
                                fontSize={"xl"}
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                                overflow={"hidden"}
                                color={"inherit"}
                                maxW={"60%"}
                            >
                                {resource.filename}
                            </Heading>
                            <Text
                                ml={"4"}
                                display={"inline"}
                                color={"gray.500"}
                                fontWeight={"bold"}
                            >
                                {resource.size &&
                                    (filesize(resource.size) as string)}
                            </Text>
                        </Flex>
                        <Text
                            fontSize={"sm"}
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            color={"inherit"}
                        >
                            <Box
                                as={FaUser}
                                mr={"2"}
                                display={"inline-block"}
                                color={"gray.500"}
                            />
                            {authorDetails}
                        </Text>
                    </Box>
                    <Text
                        justifySelf={"flex-end"}
                        w={"full"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        color={"inherit"}
                    >
                        {resource.description || ""} &nbsp;
                    </Text>
                </Flex>
                <Flex
                    justifySelf={"flex-end"}
                    flexDir={"column"}
                    justify={"flex-start"}
                    align={"end"}
                    h={"full"}
                    w={"12"}
                >
                    <Menu>
                        <MenuButton
                            h={"10"}
                            w={"8"}
                            rounded={"md"}
                            _hover={{
                                bg: "#00000044",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Box
                                as={FaEllipsisV}
                                m={"auto"}
                                cursor={"pointer"}
                                fontSize={"xl"}
                                color={"neutralizerDark"}
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
                                                onManage={() =>
                                                    onManage(resource)
                                                }
                                                resource={resource}
                                                reload={() => reload()}
                                            />
                                        );
                                }
                            } else {
                                return (
                                    <UserMenuList
                                        onDownload={() => download()}
                                    />
                                );
                            }
                        })()}
                    </Menu>
                </Flex>
            </Flex>
        </>
    );
};

export default ListResourceItem;
