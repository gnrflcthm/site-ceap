import { FC, useState } from "react";

import { Box, Flex, Input } from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";

const SearchBar: FC<{ query: string; setQuery: Function }> = ({
    query,
    setQuery,
}) => {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <Flex position={"relative"} w={"50%"}>
            <Input
                rounded={"none"}
                w={"full"}
                pr={"12"}
                type={"text"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={"Search title of resource"}
                border={"none"}
                borderBottom={"1px solid"}
                borderBottomColor={"neutralizerLight"}
                focusBorderColor={"transparent"}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                _placeholder={{
                    color: "whiteAlpha.500",
                }}
                color={"neutralizerLight"}
                autoComplete={"off"}
            />
            <Box
                as={FaSearch}
                position={"absolute"}
                top={"50%"}
                transform={"auto"}
                translateY={"-50%"}
                right={"4"}
                color={"neutralizerLight"}
            />
            <Box
                position={"absolute"}
                bottom={"0"}
                left={"50%"}
                translateX={"-50%"}
                transform={"auto"}
                w={focused ? "100%" : "0%"}
                h={"px"}
                bg={"secondary"}
                transition={"all 0.2s ease"}
            />
        </Flex>
    );
};

export default SearchBar;
