import { FC, useState, useMemo, useEffect, useRef } from "react";
import {
    Box,
    Input,
    Flex,
    Heading,
    VStack,
    Text,
    Center,
} from "@chakra-ui/react";

import { FaCaretDown } from "react-icons/fa";
import CoreOption from "./CoreOption";

const CoreSelect: FC<{
    options: [{ [key: string]: string }];
    setValue: Function;
    placeholder?: string;
    required?: boolean;
    isGrouped: boolean;
    name?: string;
    disabled?: boolean;
    filter?: string;
}> = ({
    options,
    isGrouped = false,
    setValue,
    placeholder,
    required,
    name,
    disabled = false,
    filter,
}) => {
    const [selected, setSelected] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);
    const [selectData, setSelectData] = useState<any>();
    const [processing, setProcessing] = useState<boolean>(true);
    const [clickWithin, setClickWithin] = useState<boolean>(false);

    const queriedData = useMemo<[{ [key: string]: string }]>(() => {
        setProcessing(true);
        if (query.trim() === "") {
            return {};
        }
        let tempData = structuredClone(selectData);

        Object.keys(tempData).forEach((key) => {
            // @ts-ignore
            tempData[key] = tempData[key].filter((val) =>
                val.name.toLowerCase().includes(query.toLowerCase())
            );
        });
        setTimeout(() => setProcessing(false), 1500);
        return tempData;
    }, [query, selectData]);

    const isEmpty = useMemo<boolean>(() => {
        let total = 0;
        Object.keys(queriedData).forEach((key) => {
            // @ts-ignore
            total += queriedData[key].length || 0;
        });
        return total === 0;
    }, [queriedData]);

    useEffect(() => {
        if (isGrouped) {
            setProcessing(true);
            let data = {};
            if (filter) {
                // @ts-ignore
                data[filter] = options.filter(option => option.region === filter);
            } else {
                for (let option of options) {
                    // @ts-ignore
                    data[option.region] = data[option.region] || [];
                    // @ts-ignore
                    data[option.region].push(option);
                }
            }
            Object.keys(data).forEach((key) => {
                // @ts-ignore
                data[key].sort((a, b) => a.name.localeCompare(b.name));
            });
            setSelectData(data);
        }
        setProcessing(false);
    }, [options, filter]);

    return (
        <Flex
            justify={"space-between"}
            align={"stretch"}
            w={"full"}
            position={"relative"}
        >
            <Input
                opacity={"0"}
                pointerEvents={"none"}
                value={selected}
                name={name}
                onChange={() => {}}
                required={required}
                position={"absolute"}
                top={"0"}
                left={"0"}
                w={"full"}
                h={"full"}
                tabIndex={-1}
            />
            <Input
                w={"full"}
                placeholder={focused ? `Input ${placeholder}` : ""}
                autoComplete={"none"}
                type="text"
                borderColor={
                    query || selected ? "secondary" : "neutralizerDark"
                }
                _hover={{
                    borderColor: "neutralizerDark",
                }}
                value={query}
                focusBorderColor={"secondary"}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected("");
                }}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                    if (!clickWithin || isEmpty) {
                        setFocused(false);
                    }
                }}
                disabled={disabled}
            />
            <Center
                position={"absolute"}
                right={"4"}
                top={"50%"}
                translateY={"-50%"}
                transform={"auto"}
                color={focused || query ? "secondary" : "neutralizerDark"}
            >
                <Box as={FaCaretDown} />
            </Center>
            <Text
                position={"absolute"}
                top={focused || query ? "-30%" : "50%"}
                left={focused || query ? "0" : "4"}
                translateY={"-50%"}
                transform={"auto"}
                pointerEvents={"none"}
                fontSize={"sm"}
                color={focused || query ? "secondary" : "neutralizerDark"}
                transition={"all 0.2s ease"}
            >
                {placeholder}
                {required && "*"}
            </Text>
            {!processing && focused && (
                <Box
                    onMouseDown={() => setClickWithin(true)}
                    zIndex={"dropdown"}
                    maxH={"20vh"}
                    w={"full"}
                    position={"absolute"}
                    top={"100%"}
                    bg={"white"}
                    shadow={"dark-lg"}
                    overflow={"auto"}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.100"}
                    py={"4"}
                    display={focused ? "block" : "none"}
                >
                    {isEmpty ? (
                        <Center>
                            <Text textAlign={"center"}>
                                No schools found. Check if your school is
                                registered.
                            </Text>
                        </Center>
                    ) : (
                        Object.keys(queriedData || {}).map((key) => (
                            <>
                                {/* @ts-ignore */}
                                {queriedData[key].length > 0 && (
                                    <VStack
                                        position={"relative"}
                                        w={"full"}
                                        align={"flex-start"}
                                        spacing={"0"}
                                    >
                                        <Heading
                                            fontSize={"md"}
                                            color={"gray.500"}
                                            px={"2"}
                                        >
                                            {key}
                                        </Heading>
                                        {/* @ts-ignore */}
                                        {queriedData[key].map(
                                            /* @ts-ignore */
                                            ({ name, id }) => (
                                                <CoreOption
                                                    label={name}
                                                    value={id}
                                                    select={() => {
                                                        setValue(id);
                                                        setSelected(name);
                                                        setQuery(name);
                                                        setFocused(false);
                                                        setClickWithin(false);
                                                    }}
                                                    key={id}
                                                />
                                            )
                                        )}
                                    </VStack>
                                )}
                            </>
                        ))
                    )}
                </Box>
            )}
        </Flex>
    );
};

export default CoreSelect;
