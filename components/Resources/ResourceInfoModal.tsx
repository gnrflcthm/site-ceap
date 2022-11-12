import { VStack, Text, Center, CircularProgress } from "@chakra-ui/react";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import Overlay from "@components/Modal/Overlay";
import { IMemberSchoolSchema, IResourceSchema, IUserSchema } from "@db/models";
import { AccountType } from "@util/Enums";
import { getFileClassification } from "@util/helper";
import { useData } from "@util/hooks/useData";
import { filesize } from "filesize";
import { ResourceItemType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC } from "react";

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

    return (
        <Overlay>
            <Modal>
                <ModalHeader title={"Resource"} onDismiss={() => onDismiss()} />
                <VStack align={"flex-start"} p={"4"}>
                    {resource && !isLoading ? (
                        <>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Name
                            </Text>
                            <Text fontWeight={"bold"} pl={"2"}>
                                {resource.filename}
                            </Text>
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                File Description
                            </Text>
                            <Text
                                fontWeight={"bold"}
                                pl={"2"}
                                maxH={"10rem"}
                                overflowY={"auto"}
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
