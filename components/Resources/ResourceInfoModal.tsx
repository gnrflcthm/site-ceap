import {
    VStack,
    Text,
    Center,
    CircularProgress,
    Button,
} from "@chakra-ui/react";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import Overlay from "@components/Modal/Overlay";
import { AuthContext } from "@context/AuthContext";
import { IMemberSchoolSchema, IResourceSchema, IUserSchema } from "@db/models";
import { AccountType } from "@util/Enums";
import { getFileClassification } from "@util/helper";
import { useData } from "@util/hooks/useData";
import axios, { AxiosError } from "axios";
import { filesize } from "filesize";
import { FC, useContext } from "react";

const ResourceInfoModal: FC<{
    resourceId: string;
    onDismiss: Function;
}> = ({ resourceId, onDismiss }) => {
    const {
        data: resource,
        isLoading,
        error,
    } = useData<
        IResourceSchema & {
            uploadedBy?: IUserSchema;
            memberSchool?: IMemberSchoolSchema;
        }
    >(`/api/resource/${resourceId}`);

    const { user } = useContext(AuthContext);

    const download = () => {
        if (resource) {
            const url = `/api/resource${
                user ? "/a" : ""
            }/download/${resourceId}`;
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
        }
    };

    return (
        <Overlay>
            <Modal>
                <ModalHeader title={"Resource"} onDismiss={() => onDismiss()} />
                <VStack
                    align={"flex-start"}
                    p={"4"}
                    maxH={"70vh"}
                    overflowY={"auto"}
                >
                    {resource && !isLoading ? (
                        <>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Name
                            </Text>
                            <Button
                                variant={"link"}
                                onClick={() => download()}
                                fontWeight={"bold"}
                                pl={"2"}
                                textDecor={"underline"}
                                whiteSpace={"normal"}
                                textAlign={"start"}
                                fontSize={{ base: "md", md: "lg" }}
                            >
                                {resource.filename}
                            </Button>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Description
                            </Text>
                            <Text
                                fontWeight={"bold"}
                                pl={"2"}
                                maxH={"10rem"}
                                whiteSpace={'normal'}
                                overflowX={"hidden"}
                                overflowY={"auto"}
                                w={"full"}
                                css={{
                                    "&::-webkit-scrollbar": {
                                        width: "0.5rem",
                                        backgroundColor: "#66666633",
                                        borderRadius: "1rem",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        width: "0.5rem",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        border: `5px solid #CCCCCCFF`,
                                        "background-clip": "padding-box",
                                        borderRadius: "2rem",
                                    },
                                }}
                            >
                                {resource.description || ""}
                            </Text>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Classification
                            </Text>
                            <Text fontWeight={"bold"} pl={"2"}>
                                {getFileClassification(resource.classification)}
                            </Text>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Type
                            </Text>
                            <Text fontWeight={"bold"} pl={"2"}>
                                {resource.fileType}
                            </Text>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Size
                            </Text>
                            <Text fontWeight={"bold"} pl={"2"}>
                                {resource?.size
                                    ? (filesize(resource.size) as string)
                                    : "Unknown"}
                            </Text>
                            {resource.uploadedBy && (
                                <>
                                    <Text
                                        textTransform={"uppercase"}
                                        fontSize={"md"}
                                    >
                                        Uploaded By
                                    </Text>
                                    <Text fontWeight={"bold"} pl={"2"}>
                                        {`${resource?.uploadedBy?.firstName} ${resource.uploadedBy?.lastName}`}
                                    </Text>
                                </>
                            )}
                            {resource.memberSchool ? (
                                <>
                                    <Text
                                        textTransform={"uppercase"}
                                        fontSize={"md"}
                                    >
                                        Uploaded From
                                    </Text>
                                    <Text fontWeight={"bold"} pl={"2"}>
                                        {resource.memberSchool.name}
                                    </Text>
                                </>
                            ) : resource.uploadedBy &&
                              [
                                  AccountType.CEAP_ADMIN,
                                  AccountType.CEAP_SUPER_ADMIN,
                              ].includes(resource.uploadedBy.accountType) ? (
                                <>
                                    <Text
                                        textTransform={"uppercase"}
                                        fontSize={"md"}
                                    >
                                        Uploaded From
                                    </Text>
                                    <Text fontWeight={"bold"} pl={"2"}>
                                        CEAP
                                    </Text>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <Center p={"8"} w={"full"}>
                            <CircularProgress
                                isIndeterminate
                                size={8}
                                color={"secondary"}
                            />
                        </Center>
                    )}
                </VStack>
            </Modal>
        </Overlay>
    );
};

export default ResourceInfoModal;
