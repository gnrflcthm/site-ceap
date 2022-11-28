import { FC } from "react";
import Modal from "./Modal";
import Overlay from "./Overlay";
import ModalHeader from "./ModalHeader";
import { VStack, Text, Center, CircularProgress } from "@chakra-ui/react";
import { useData } from "@util/hooks/useData";
import { IUserSchema } from "@db/models";
import { getAccountType } from "@util/functions";
import { ObjectId } from "mongodb";

const UserInfoModal: FC<{ userId: string | ObjectId; onDismiss: Function }> = ({
    userId,
    onDismiss,
}) => {
    const { data: user, isLoading } = useData<
        IUserSchema & { memberSchool?: { id: string; name: string } }
    >(`/api/member/${userId}`);
    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"User Info"}
                    onDismiss={() => onDismiss()}
                />
                {user && !isLoading ? (
                    <VStack align={"flex-start"} p={"4"}>
                        <Text textTransform={"uppercase"} fontSize={"md"}>
                            First Name
                        </Text>
                        <Text fontWeight={"bold"} pl={'2'}>{user.firstName}</Text>
                        <Text textTransform={"uppercase"} fontSize={"md"}>
                            Last Name
                        </Text>
                        <Text fontWeight={"bold"} pl={'2'}>{user.lastName}</Text>
                        <Text textTransform={"uppercase"} fontSize={"md"}>
                            Middle Name
                        </Text>
                        <Text fontWeight={"bold"} pl={'2'}>{user.middleName || "N/A"}</Text>
                        <Text textTransform={"uppercase"} fontSize={"md"}>
                            Email Address
                        </Text>
                        <Text fontWeight={"bold"} pl={'2'}>{user.email}</Text>
                        <Text textTransform={"uppercase"} fontSize={"md"}>
                            Mobile Number
                        </Text>
                        <Text fontWeight={"bold"} pl={'2'}>{user.mobileNumber || "N/A"}</Text>
                        <Text textTransform={"uppercase"} fontSize={"md"}>
                            Account Type
                        </Text>
                        <Text fontWeight={"bold"} pl={'2'}>{getAccountType(user.accountType)}</Text>
                        {user.memberSchool && (
                            <Text>{user.memberSchool.name}</Text>
                        )}
                    </VStack>
                ) : (
                    <Center py={"4"}>
                        <CircularProgress
                            isIndeterminate
                            color={"secondary"}
                            size={8}
                        />
                    </Center>
                )}
            </Modal>
        </Overlay>
    );
};

export default UserInfoModal;
