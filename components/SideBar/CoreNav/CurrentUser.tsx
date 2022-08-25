import { FC } from "react";

import { Avatar, VStack, Text, Heading, useAriaHidden } from "@chakra-ui/react";

import logo from "../../../../assets/CORE_logo.png";

const CurrentUser: FC<{
    firstName?: string;
    lastName?: string;
    userAvatar?: string;
    accountType?: string;
    collapsed?: boolean;
}> = ({ firstName, lastName, userAvatar, accountType, collapsed }) => {
    return (
        <VStack spacing={"2"} color={"neutralizerLight"} mb={"4"}>
            <Avatar
                size={collapsed ? "lg" : "xl"}
                name={`${firstName} ${lastName}`}
                src={userAvatar}
                bg={"secondaryAccent"}
                color={"neutralizerDark"}
            />
            {!collapsed && (
                <>
                    <Heading
                        fontSize={"2xl"}
                    >{`${lastName}, ${firstName}`}</Heading>
                    <Text fontSize={"lg"}>{accountType}</Text>
                </>
            )}
        </VStack>
    );
};

export default CurrentUser;
