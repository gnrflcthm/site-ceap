import { ChangeEventHandler, FC, useState } from "react";

import { Input, Box, Text, Select } from "@chakra-ui/react";

const CoreInput: FC<{
    name?: string;
    type?: string;
    placeholder?: string;
    value?: any;
    values?: Array<any>;
    width?: string;
    bg?: string;
    placeholderColor?: string;
    setValue: Function;
    required?: boolean;
    pattern?: string;
    readonly?: boolean;
}> = ({
    name,
    type,
    placeholder,
    value,
    values,
    setValue,
    width,
    bg,
    placeholderColor,
    required,
    readonly,
}) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <Box w={"full"} pos={"relative"}>
            <Text
                pos={"absolute"}
                fontSize={"sm"}
                color={focused || value ? "secondary" : "neutralizerDark"}
                top={focused || value ? "-30%" : "50%"}
                left={focused || value ? "0" : "4"}
                transform={"auto"}
                translateY={"-50%"}
                transition={"all 0.2s ease"}
            >
                {placeholder}
                {required && "*"}
            </Text>
            {type === "select" ? (
                <Select
                    {...{ name, required }}
                    borderColor={value ? "secondary" : "neutralizerDark"}
                    focusBorderColor={"secondary"}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={value}
                >
                    <option disabled={true}></option>
                    {values?.map((val) => (
                        <option>{val}</option>
                    ))}
                </Select>
            ) : (
                <Input
                    type={type}
                    {...{ name, value, required }}
                    borderColor={value ? "secondary" : "neutralizerDark"}
                    focusBorderColor={"secondary"}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    _before={{ content: `""`, position: "absolute" }}
                    color={value ? "neutralizerDark" : "transparent"}
                    _focus={{
                        color: "neutralizerDark",
                        _before: {
                            content: `""`,
                            color: "neutralizerDark",
                        },
                    }}
                    _valid={{
                        _before: {
                            content: `""`,
                            color: "neutralizerDark",
                        },
                    }}
                />
            )}
        </Box>
    );
};

export default CoreInput;
