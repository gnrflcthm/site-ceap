import { AccountType, MemberSchool, User } from "@prisma/client";
import { motion } from "framer-motion";
import { FC, useContext, useState } from "react";
import { FaEllipsisV, FaPencilAlt, FaTrash } from "react-icons/fa";
import {
    Text,
    Tr,
    Td,
    VStack,
    Heading,
    Center,
    CircularProgress,
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { AuthContext } from "@context/AuthContext";
import { getAccountType } from "@util/functions";

const UserData: FC<{
    user: User & { memberSchool?: MemberSchool };
    showEdit?: Function;
    onDelete?: Function;
}> = ({ user, showEdit = () => {}, onDelete = () => {} }) => {
    const {
        id,
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        schoolId,
        accountType,
        memberSchool,
    } = user;

    const { user: admin } = useContext(AuthContext);

    const [processing, setProcessing] = useState<boolean>(false);

    const textFontSize = { base: "sm", md: "md" };
    return (
        <Tr
            as={motion.tr}
            p={0}
            _hover={{
                bg: "blackAlpha.50",
            }}
        >
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
            {admin && admin.role === AccountType.CEAP_SUPER_ADMIN && (
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>
                        {getAccountType(accountType)}
                    </Text>
                </Td>
            )}
            {admin && ["CEAP_SUPER_ADMIN", "CEAP_ADMIN"].includes(admin.role) && (
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>
                        {(memberSchool && memberSchool.name) || "N/A"}
                    </Text>
                </Td>
            )}
            {admin && admin.role === AccountType.MS_ADMIN && (
                <Td px={"4"} py={"2"}>
                    <Text fontSize={textFontSize}>{schoolId ?? "N/A"}</Text>
                </Td>
            )}

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
                            <MenuItem onClick={() => showEdit(id)}>
                                <Box as={FaPencilAlt} mr={"2"} />
                                <Text fontSize={"md"} lineHeight={"0"}>
                                    Edit
                                </Text>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setProcessing(true);
                                    onDelete(id);
                                }}
                            >
                                <Box as={FaTrash} mr={"2"} />
                                <Text fontSize={"md"} lineHeight={"0"}>
                                    Delete
                                </Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Td>
        </Tr>
    );
};

export default UserData;
