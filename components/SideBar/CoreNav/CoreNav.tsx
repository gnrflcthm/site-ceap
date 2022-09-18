import { FC, useMemo, useContext, useState } from "react";

import { Box, Center, VStack, Text, CircularProgress, Flex } from "@chakra-ui/react";

import {
    FaChartArea,
    FaBook,
    FaUser,
    FaSignOutAlt,
    FaFileAlt,
    FaUpload,
    FaHistory,
} from "react-icons/fa";

import { BsCloudUpload } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";

import CurrentUser from "./CurrentUser";
import CoreNavItem from "./CoreNavItem";
import { useRouter } from "next/router";

import "../../../firebase/client";
import { AuthContext } from "@context/AuthContext";

const CoreNav: FC<{
    collapsed?: boolean;
}> = () => {
    const { loading, user, role, logout } = useContext(AuthContext);
    const [loggingOut, setLogginOut] = useState<boolean>(false);
    const router = useRouter();

    const isAdministrative = useMemo(
        () =>
            ["CEAP Super Admin", "CEAP Admin", "Member School Admin"].includes(
                role || ""
            ),
        [role]
    );

    return (
        <Flex flexDir={"column"} h={"full"} py={{ base: "0", lg: "10" }}>
            {loggingOut ? (
                <Center flexDir={"column"} h={'full'}>
                    <Text mb={"4"}>Signing Out</Text>
                    <CircularProgress isIndeterminate color={"secondary"} />
                </Center>
            ) : (
                <>
                    <CurrentUser
                        displayName={user?.displayName}
                        accountType={role}
                    />
                    <Flex flex={"1"} flexDir={"column"} justify={"space-between"} align={'stretch'}>
                        <VStack spacing={{ base: "1", lg: "2" }}>
                            <CoreNavItem
                                name={"Resources"}
                                href={"/"}
                                icon={FaBook}
                            />
                            {isAdministrative && (
                                <>
                                    <CoreNavItem
                                        name={"Upload Requests"}
                                        href={"/uploads"}
                                        icon={BsCloudUpload}
                                    />
                                    <CoreNavItem
                                        name={"Audit Logs"}
                                        href={"/logs"}
                                        icon={FaHistory}
                                    />
                                </>
                            )}
                            {role === "Member School Admin" && (
                                <CoreNavItem
                                    name={"Registrations"}
                                    href={"/user_registrations"}
                                    icon={HiUsers}
                                />
                            )}
                            <CoreNavItem
                                name={"Profile"}
                                href={"/profile"}
                                icon={FaUser}
                            />
                        </VStack>
                        <Center>
                            <CoreNavItem
                                name={"Logout"}
                                onClick={() => {
                                    setLogginOut(true);
                                    router.push("/");
                                    logout();
                                }}
                                icon={FaSignOutAlt}
                                bg={"red.500"}
                                color={"neutralizerLight"}
                            />
                        </Center>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default CoreNav;
