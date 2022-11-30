import { AnimatePresence, motion } from "framer-motion";
import { FC, useContext } from "react";
import { FaEllipsisV, FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import {
    Text,
    Tr,
    Td,
    VStack,
    Heading,
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { AuthContext } from "@context/AuthContext";
import { getAccountType } from "@util/functions";
import { IMemberSchoolSchema, IUserSchema } from "@db/models";
import { AccountType } from "@util/Enums";
import dynamic from "next/dynamic";

const UserInfoModal = dynamic(() => import("@components/Modal/UserInfoModal"));

const UserData: FC<{
    user: IUserSchema & {
        _id: string;
        memberSchool: IMemberSchoolSchema & { _id: string };
    };
    onChangeAccountType?: Function;
    onDelete?: Function;
}> = ({ user, onChangeAccountType = () => {}, onDelete = () => {} }) => {
    const {
        _id,
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

    const textFontSize = { base: "sm", md: "md" };

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            <Tr
                as={motion.tr}
                p={0}
                _hover={{
                    bg: "blackAlpha.50",
                }}
            >
                <Td px={"4"} py={"2"}>
                    <VStack
                        spacing={"0"}
                        align={"flex-start"}
                        as={Button}
                        variant={"link"}
                        onClick={() => onOpen()}
                    >
                        <Heading
                            color={"inherit1"}
                            fontSize={{ base: "md", lg: "lg" }}
                        >{`${lastName}, ${firstName} ${
                            middleName ? middleName[0] + "." : ""
                        }`}</Heading>
                        <Text color={"inherit1"} fontSize={textFontSize}>
                            {email}
                        </Text>
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
                {admin &&
                    ["CEAP_SUPER_ADMIN", "CEAP_ADMIN"].includes(admin.role) && (
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
                    <Menu>
                        <MenuButton w={"full"}>
                            <Box
                                as={FaEllipsisV}
                                m={"auto"}
                                cursor={"pointer"}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => onChangeAccountType(_id)}>
                                <Box
                                    as={
                                        [
                                            AccountType.CEAP_SUPER_ADMIN,
                                            AccountType.MS_ADMIN,
                                        ].includes(accountType)
                                            ? FaArrowDown
                                            : FaArrowUp
                                    }
                                    mr={"2"}
                                />
                                <Text fontSize={"md"} lineHeight={"0"}>
                                    {[
                                        AccountType.CEAP_SUPER_ADMIN,
                                        AccountType.MS_ADMIN,
                                    ].includes(accountType)
                                        ? "Demote"
                                        : "Promote"}
                                </Text>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onDelete(_id);
                                }}
                            >
                                <Box as={FaTrash} mr={"2"} />
                                <Text fontSize={"md"} lineHeight={"0"}>
                                    Delete
                                </Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Td>
            </Tr>
            <AnimatePresence>
                {isOpen && (
                    <UserInfoModal
                        onDismiss={() => onClose()}
                        userId={user._id}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default UserData;
