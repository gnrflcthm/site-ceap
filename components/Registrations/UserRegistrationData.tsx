import { FC, useState } from "react";
import { IUserRegistrationSchema } from "@db/index";

import {
    Heading,
    Text,
    VStack,
    Tr,
    Td,
    Box,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    useToast,
    CircularProgress,
    Center,
    useDisclosure,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { FaEllipsisV } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const DeleteRejectPrompt = dynamic(
    () => import("@components/Accounts/DeleteRejectPrompt")
);

const UserRegistrationData: FC<{
    data: IUserRegistrationSchema & {
        _id: string;
        registeredAt: string;
        birthday?: string;
    };
    refresh: Function;
}> = ({ data, refresh }) => {
    const {
        firstName,
        lastName,
        middleName,
        mobileNumber,
        email,
        _id,
        registeredAt,
        schoolId,
    } = data;

    const toast = useToast();

    const [processing, setProcessing] = useState<boolean>(false);

    const accept = () => {
        axios
            .post("/api/member/accept", { id: _id })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Accept Status:", res.status);
                    toast({
                        title: "Success",
                        description: "Account has been created successfully.",
                        status: "success",
                    });
                }
                refresh();
            })
            .catch((err: AxiosError) => {
                console.log(err);
                setProcessing(false);
            });
    };

    const reject = (reason: string) => {
        axios
            .post("/api/member/reject", { id: _id, reason })
            .then((res) => {
                if (res.status === 200) {
                    toast({
                        title: "Account Has Been Removed",
                        description: "The user will be notified shortly.",
                        status: "success",
                    });
                }
                onClose();
                refresh();
            })
            .catch((err: AxiosError) => {
                console.log(err);
                onClose();
            });
    };

    const textFontSize = { base: "sm", md: "md" };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tr
                as={motion.tr}
                p={0}
                _hover={{
                    bg: "blackAlpha.50",
                }}
            >
                <Td px={"4"} py={"2"} w={"5%"}>
                    <Text fontSize={textFontSize}>
                        {registeredAt
                            ? new Date(registeredAt).toLocaleDateString()
                            : ""}
                    </Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <VStack spacing={"0"} align={"flex-start"}>
                        <Heading
                            fontSize={{ base: "md", lg: "lg" }}
                        >{`${lastName}, ${firstName} ${
                            middleName ? middleName[0] + "." : ""
                        }`}</Heading>
                        <Text fontSize={textFontSize}>{email}</Text>
                    </VStack>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{mobileNumber ?? ""}</Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{schoolId ?? ""}</Text>
                </Td>
                <Td px={"4"} py={"2"}>
                    {processing ? (
                        <Center>
                            <CircularProgress
                                isIndeterminate
                                color={"secondary"}
                                size={8}
                            />
                        </Center>
                    ) : (
                        <Menu>
                            <MenuButton w={"full"}>
                                <Box
                                    as={FaEllipsisV}
                                    m={"auto"}
                                    cursor={"pointer"}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title="Actions">
                                    <MenuItem
                                        color={"green.500"}
                                        onClick={() => accept()}
                                    >
                                        Accept
                                    </MenuItem>
                                    <MenuItem
                                        color={"red.500"}
                                        onClick={() => onOpen()}
                                    >
                                        Reject
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    )}
                </Td>
            </Tr>
            <AnimatePresence>
                {isOpen && (
                    <DeleteRejectPrompt
                        action={"reject"}
                        confirmText={"Reject"}
                        onConfirm={reject}
                        onDismiss={onClose}
                        title={"Reject Registration"}
                        prompt={`Are you sure you want to reject ${firstName} ${lastName}'s registration request?`}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default UserRegistrationData;
