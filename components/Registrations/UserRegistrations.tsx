import { FC, useState } from "react";
import { UserRegistration } from "@prisma/client";

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
} from "@chakra-ui/react";
import axios from "axios";

import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";

const RegistrationData: FC<{ data: UserRegistration; refresh: Function }> = ({
    data,
    refresh,
}) => {
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

    const accept = async () => {
        let { status } = await axios.post("/api/member/accept", { id });
        console.log("Accept Status:", status);
        toast({
            title: "Success",
            description: "Account has been created successfully.",
            status: "success",
        });
        refresh();
    };

    const reject = async () => {
        let { status } = await axios.post("/api/member/reject", { id });
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
            onClick={() => {
                accept();
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
                <Menu>
                    <MenuButton w={"full"}>
                        <Box as={FaEllipsisV} m={"auto"} cursor={"pointer"} />
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
            </Td>
        </Tr>
    );
};

export default RegistrationData;
