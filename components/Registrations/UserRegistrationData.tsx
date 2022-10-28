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
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";

const UserRegistrationData: FC<{
    data: IUserRegistrationSchema & {
        id: string;
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
        id,
        registeredAt,
        schoolId,
    } = data;

    const toast = useToast();

    const [processing, setProcessing] = useState<boolean>(false);

    const accept = () => {
        setProcessing(true);
        axios
            .post("/api/member/accept", { id })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Accept Status:", res.status);
                    toast({
                        title: "Success",
                        description: "Account has been created successfully.",
                        status: "success",
                    });
                    refresh();
                }
                refresh();
            })
            .catch((err: AxiosError) => {
                console.log(err);
                setProcessing(false);
            });
    };

    const reject = () => {
        setProcessing(true);
        axios
            .post("/api/member/reject", { id })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Reject Status:", res.status);
                    toast({
                        title: "Account Has Been Removed",
                        description: "The user will be notified shortly.",
                        status: "success",
                    });
                    refresh();
                }
                refresh();
            })
            .catch((err: AxiosError) => {
                console.log(err);
                setProcessing(false);
            });
    };

    const textFontSize = { base: "sm", md: "md" };

    return (
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
                                    onClick={() => reject()}
                                >
                                    Reject
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                )}
            </Td>
        </Tr>
    );
};

export default UserRegistrationData;
