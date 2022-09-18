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
    isHidden?: boolean;
    placeholder?: string;
    onClick?: Function;
}> = ({
    label,
    value,
    setValue = () => {},
    isEditable = false,
    isHidden = false,
    placeholder,
    onClick,
}) => {
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
                onClick={() => {
                    if (onClick) {
                        onClick();
                        return;
                    }
                    handleClick();
                }}
            >
                <Heading fontSize={{ base: "md", lg: "xl" }} w={"fit-content"}>
                    {label}
                </Heading>
                <Flex
                    align={"center"}
                    justify={"space-between"}
                    _hover={{
                        textDecor:
                            isEditable && !updating ? "underline" : "none",
                    }}
                    cursor={isEditable ? "pointer" : "initial"}
                >
                    {updating && isEditable && !onClick ? (
                        <CoreInput value={value} setValue={setValue} />
                    ) : (
                        <>
                            {isEditable && (
                                <Box
                                    as={FaPencilAlt}
                                    color={"primary"}
                                    fontSize={"sm"}
                                    mr={"2"}
                                />
                            )}
                            <Text
                                color={
                                    isEditable ? "primary" : "neutralizerDark"
                                }
                            >
                                {isHidden ? placeholder : value}
                            </Text>
                        </>
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default UserInfo;
