import { FC, useMemo, useContext, useState, useEffect } from "react";

import { Center, VStack, Text, CircularProgress, Flex } from "@chakra-ui/react";

import { FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";

import { BsCloudUpload } from "react-icons/bs";

import CurrentUser from "./CurrentUser";
import CoreNavItem from "./CoreNavItem";
import { useRouter } from "next/router";

import "../../../firebase/client";
import { AuthContext } from "@context/AuthContext";
import { CollapseContext } from "pages/_app";
import { getAccountType } from "@util/functions";
import Routes from "./Routes";

import { AccountType } from "@util/Enums";

const CoreNav: FC<{
    collapsed?: boolean;
}> = () => {
    const { user, logout } = useContext(AuthContext);
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useContext(CollapseContext);
    const router = useRouter();

    const isAdministrative = useMemo(
        () =>
            ["CEAP Super Admin", "CEAP Admin", "Member School Admin"].includes(
                getAccountType(user?.role)
            ),
        [user?.role]
    );

    useEffect(() => {
        console.log(user?.role + ": ", getAccountType(user?.role));
    }, [user]);

    const onLogOut = () => {
        setLoggingOut(true);
        router.push("/");
        logout();
    };

    return (
        <Flex
            flexDir={"column"}
            h={"full"}
            flex={"1"}
            overflow={"auto"}
            py={{ base: "0", lg: "10" }}
        >
            {!loggingOut && user ? (
                <>
                    <CurrentUser
                        displayName={user?.displayName}
                        accountType={getAccountType(user?.role)}
                    />
                    <Flex
                        flex={"1"}
                        flexDir={"column"}
                        justify={"space-between"}
                        align={"stretch"}
                    >
                        <VStack spacing={{ base: "1", lg: "2" }}>
                            <CoreNavItem
                                name={"Resources"}
                                href={"/"}
                                icon={FaBook}
                            />
                            <Routes role={user.role as AccountType} />
                            <CoreNavItem
                                name={"Profile"}
                                href={"/profile"}
                                icon={FaUser}
                            />
                        </VStack>
                        <Center>
                            <CoreNavItem
                                name={"Logout"}
                                onClick={() => onLogOut()}
                                icon={FaSignOutAlt}
                                bg={"red.500"}
                                color={"neutralizerLight"}
                            />
                        </Center>
                    </Flex>
                </>
            ) : (
                <>
                    {!collapsed && loggingOut && (
                        <Center flexDir={"column"} h={"full"}>
                            <Text mb={"4"}>Signing Out</Text>
                            <CircularProgress
                                isIndeterminate
                                color={"secondary"}
                            />
                        </Center>
                    )}
                </>
            )}
        </Flex>
    );
};

export default CoreNav;
