import { FC, useState } from "react";
import { MemberSchool, MSAdminRegistration } from "@prisma/client";

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
    Center,
    CircularProgress,
} from "@chakra-ui/react";
import axios from "axios";

import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminRegistrationData: FC<{
    data: MSAdminRegistration & { memberSchool: MemberSchool };
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
        memberSchool,
    } = data;

    const toast = useToast();

    const [processing, setProcessing] = useState<boolean>(false);

    const accept = async () => {
        setProcessing(true);
        let { status } = await axios.post("/api/admin/accept", { id });
        console.log("Accept Status:", status);
        toast({
            title: "Success",
            description: "Account has been created successfully.",
            status: "success",
        });
        refresh();
    };

    const reject = async () => {
        setProcessing(true);
        let { status } = await axios.post("/api/admin/reject", { id });
        console.log("Reject Status:", status);
        toast({
            title: "Account Has Been Removed",
            description: "The user will be notified shortly.",
            status: "success",
        });
        refresh();
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
            <Td px={"4"} py={"2"} fontWeight={"bold"}>
                <Text fontSize={textFontSize}>{memberSchool.name ?? ""}</Text>
            </Td>
            <Td px={"4"} py={"2"}>
                {processing ? (
                    <Center>
                        <CircularProgress isIndeterminate color={"secondary"} size={8} />
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

export default AdminRegistrationData;
