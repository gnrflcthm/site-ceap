import { FC, useState, MouseEventHandler, useContext } from "react";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

import { FaPencilAlt } from "react-icons/fa";
import CoreInput from "@components/CoreInput";
import { ProfileModeContext } from "pages/profile";

const UserInfo: FC<{
    label?: string;
    value?: string;
    setValue?: Function;
    isEditable?: boolean;
}> = ({ label, value, setValue = () => {}, isEditable = false }) => {

    const [updating, setUpdating] = useContext(ProfileModeContext);

    const handleClick = () => {
        if (!isEditable) return;
        setUpdating(true);
    };

    return (
        <>
            <Flex
                justify={"space-between"}
                align={"center"}
                w={"full"}
                onClick={handleClick}
            >
                <Heading fontSize={"xl"}>{label}</Heading>
                <Flex
                    align={"center"}
                    justify={"space-between"}
                    _hover={{
                        textDecor:
                            isEditable && !updating ? "underline" : "none",
                    }}
                    cursor={isEditable ? "pointer" : "initial"}
                >
                    {updating && isEditable ? (
                        <CoreInput value={value} setValue={setValue} />
                    ) : (
                        <>
                            <Text
                                mr={"2"}
                                color={
                                    isEditable ? "primary" : "neutralizerDark"
                                }
                            >
                                {value}
                            </Text>
                            {isEditable && (
                                <Box as={FaPencilAlt} color={"primary"} />
                            )}
                        </>
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default UserInfo;
