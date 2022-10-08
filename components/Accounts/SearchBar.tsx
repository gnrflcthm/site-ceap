import { FC } from "react";

import { Flex, Input } from "@chakra-ui/react";

const SearchBar: FC = () => {
    return (
        <Flex>
            <Input
                w={"full"}
                transition={"all 0.2s ease"}
                border={"1px solid"}
                borderColor={"neutralizerDark"}
                focusBorderColor={"neutralizerDark"}
                rounded={"full"}
                bg={"neutralizerLight"}
                _hover={{
                    borderColor: "neutralizerDark"
                }}
            />
        </Flex>
    );
};

export default SearchBar;
