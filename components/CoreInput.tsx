import { ChangeEventHandler, FC, useState } from "react";

import { Input, Box, Text, Select } from "@chakra-ui/react";

const CoreInput: FC<{
    name?: string;
    type?: string;
    placeholder?: string;
    value?: any;
    values?: { [key: string]: string[] };
    width?: string;
    bg?: string;
    placeholderColor?: string;
    setValue: Function;
    required?: boolean;
    pattern?: string;
    readonly?: boolean;
    autoComplete?: string;
    onClick?: Function;
    onFocus?: Function;
    onBlur?: Function;
    disabled?: boolean;
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
    pattern,
    readonly,
    disabled = false,
    autoComplete,
    onClick = () => {},
    onFocus = () => {},
    onBlur = () => {},
}) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <Box w={"full"} pos={"relative"} onClick={() => onClick()}>
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
                    {...{ name, required, disabled }}
                    borderColor={value ? "secondary" : "neutralizerDark"}
                    focusBorderColor={"secondary"}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={value}
                    maxH={"30vh"}
                >
                    <option disabled={true}></option>
                    {values &&
                        Object.keys(values).map((key) => (
                            <Box as={"optgroup"} label={key}>
                                {values[key].map((val) => (
                                    <Box as={"option"} value={val}>
                                        {val}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                </Select>
            ) : (
                <Input
                    type={type}
                    {...{ name, value, required, disabled, pattern }}
                    borderColor={value ? "secondary" : "neutralizerDark"}
                    focusBorderColor={"secondary"}
                    onFocus={() => {
                        onFocus();
                        setFocused(true);
                    }}
                    onBlur={() => {
                        onBlur();
                        setFocused(false);
                    }}
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
                    autoComplete={autoComplete}
                />
            )}
        </Box>
    );
};

export default CoreInput;
