import { FC, useState } from "react";

import { Box, Flex, Input } from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";

const SearchBar: FC<{
    query: string;
    setQuery: Function;
    onSearch?: Function;
    width?: string | { [key: string]: any };
    inputColor?: string;
    placeholderColor?: string;
    placeholder?: string;
    hasForm?: boolean;
    showIcon?: boolean;
}> = ({
    query,
    setQuery,
    onSearch = () => {},
    width,
    inputColor = "neutralizerLight",
    placeholderColor = "#888888",
    placeholder,
    hasForm = false,
    showIcon = true,
}) => {
    return (
        <Flex
            as={hasForm ? "div" : "form"}
            position={"relative"}
            w={width || "full"}
            onSubmit={(e) => onSearch(e)}
        >
            <Input
                rounded={"none"}
                w={"full"}
                pr={"12"}
                type={"text"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder || ""}
                focusBorderColor={"secondary"}
                color={inputColor}
                _placeholder={{
                    color: placeholderColor,
                }}
                autoComplete={"off"}
                name={"q"}
            />
            {showIcon && (
                <Box
                    as={FaSearch}
                    position={"absolute"}
                    top={"50%"}
                    transform={"auto"}
                    translateY={"-50%"}
                    right={"4"}
                    color={inputColor || "neutralizerDark"}
                />
            )}
        </Flex>
    );
};

export default SearchBar;
