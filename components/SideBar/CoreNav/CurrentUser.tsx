import { FC, useContext } from "react";
import { CollapseContext } from "pages/_app";

import { Avatar, VStack, Text, Heading, useAriaHidden } from "@chakra-ui/react";

import logo from "../../../../assets/CORE_logo.png";

const CurrentUser: FC<{
    displayName?: string | null;
    userAvatar?: string;
    accountType?: string;
}> = ({ displayName, userAvatar, accountType }) => {
    const [collapsed] = useContext(CollapseContext);
    return (
        <VStack spacing={"2"} color={"neutralizerLight"} mb={"4"}>
            <Avatar
                size={collapsed ? "lg" : "xl"}
                name={displayName ?? ""}
                src={userAvatar}
                bg={"secondaryAccent"}
                color={"neutralizerDark"}
            />
            {!collapsed && (
                <>
                    <Heading fontSize={"2xl"}>{displayName}</Heading>
                    <Text fontSize={"lg"}>{accountType}</Text>
                </>
            )}
        </VStack>
    );
};

export default CurrentUser;
