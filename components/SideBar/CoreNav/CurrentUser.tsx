import { FC, useContext } from "react";
import { CollapseContext } from "pages/_app";

import { Avatar, Text, Heading, useBreakpoint, Flex } from "@chakra-ui/react";
import { getAccountType } from "@util/functions";

const CurrentUser: FC<{
    displayName?: string | null;
    userAvatar?: string;
    accountType?: string;
}> = ({ displayName, userAvatar, accountType }) => {
    const [collapsed] = useContext(CollapseContext);
    const breakpoint = useBreakpoint();

    switch (breakpoint) {
        case "lg":
        case "xl":
        case "2xl":
            return (
                <Flex flexDir={"column"} align={"center"} color={"neutralizerLight"} mb={"4"}>
                    <Avatar
                        size={collapsed ? "lg" : "xl"}
                        name={displayName ?? ""}
                        src={userAvatar}
                        bg={"secondaryAccent"}
                        color={"neutralizerDark"}
                        mb={"4"}
                    />
                    {!collapsed && (
                        <>
                            <Heading fontSize={"3xl"} textAlign={"center"}>{displayName}</Heading>
                            <Text fontSize={"lg"}>{accountType}</Text>
                        </>
                    )}
                </Flex>
            );
        default:
            return (
                <Flex
                    align={"stretch"}
                    justify={"flex-start"}
                    mb={"4"}
                    px={"2"}
                    py={"4"}
                    borderBottom={"1px solid"}
                    borderBottomColor={"blackAlpha.300"}
                >
                    <Avatar
                        size={"lg"}
                        name={displayName ?? ""}
                        src={userAvatar}
                        bg={"secondaryAccent"}
                        color={"neutralizerDark"}
                        mr={"4"}
                    />
                    <Flex
                        flexDir={"column"}
                        justify={"center"}
                        align={"flex-start"}
                    >
                        <Heading fontSize={"xl"} mb={"0"}>
                            {displayName}
                        </Heading>
                        <Text>{accountType}</Text>
                    </Flex>
                </Flex>
            );
    }
};

export default CurrentUser;
