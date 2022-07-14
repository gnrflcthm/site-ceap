import { FC } from "react";

import { Heading } from "@chakra-ui/react";

const MVCVHeading: FC<{ heading: string }> = ({ heading }) => {
    return (
        <Heading
            px={"10"}
            py={"4"}
            bg={"primary"}
            color={"neutralizerLight"}
            display={"inline-block"}
            alignSelf={"flex-start"}
            mb={"4"}
        >
            {heading}
        </Heading>
    );
};

export default MVCVHeading;
