import { FC, useState } from "react";

import { Box, Flex, Input } from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";

const SearchBar: FC<{
    query: string;
    setQuery: Function;
    onSearch: Function;
    width?: string | { [key: string]: any };
    inputColor?: string;
    placeholderColor?: string;
}> = ({ query, setQuery, onSearch, width, inputColor = "neutralizerLight", placeholderColor = "#888888" }) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <Flex
            as={"form"}
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
                placeholder={"Search title of resource"}
                // border={"none"}
                // borderBottom={"1px solid"}
                // borderBottomColor={"neutralizerLight"}
                focusBorderColor={"secondary"}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                color={inputColor}
                _placeholder={{
                    color: placeholderColor,
                }}
                // color={"neutralizerLight"}
                autoComplete={"off"}
                name={"q"}
            />
            <Box
                as={FaSearch}
                position={"absolute"}
                top={"50%"}
                transform={"auto"}
                translateY={"-50%"}
                right={"4"}
                color={inputColor || "neutralizerDark"}
            />
        </Flex>
    );
};

export default SearchBar;
