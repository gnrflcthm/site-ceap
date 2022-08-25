import { FC } from "react";

import { Box, Flex, Tooltip, Button, VStack } from "@chakra-ui/react";

import {
    FaChartArea,
    FaBook,
    FaUser,
    FaSignOutAlt,
    FaFileAlt,
    FaHistory,
} from "react-icons/fa";

import CurrentUser from "./CurrentUser";
import CoreNavItem from "./CoreNavItem";
import { useRouter } from "next/router";

const CoreNav: FC<{
    collapsed?: boolean;
}> = ({ collapsed }) => {
    return (
        <Box flex={"1"}>
            <CurrentUser
                firstName={"Gian"}
                lastName={"Thiam"}
                accountType={"Developer"}
                collapsed={collapsed}
            />
            <VStack>
                <CoreNavItem
                    href={"/"}
                    name={"Resources"}
                    icon={FaChartArea}
                    collapsed={collapsed}
                />
                <CoreNavItem
                    href={"/"}
                    name={"Account Registrations"}
                    icon={FaFileAlt}
                    collapsed={collapsed}
                />
                <CoreNavItem
                    href={"/"}
                    name={"Resources"}
                    icon={FaBook}
                    collapsed={collapsed}
                />
                <CoreNavItem
                    href={"/profile"}
                    name={"Profile"}
                    icon={FaUser}
                    collapsed={collapsed}
                />
                <CoreNavItem
                    href={"/"}
                    name={"System Logs"}
                    icon={FaHistory}
                    collapsed={collapsed}
                />
            </VStack>
        </Box>
    );
};

export default CoreNav;
