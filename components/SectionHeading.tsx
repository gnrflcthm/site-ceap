import { FC, PropsWithChildren } from "react";

import { CSSObject, Heading, Flex } from "@chakra-ui/react";

interface SectionHeadingProps extends PropsWithChildren {
    color?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({ children, color }) => {
    const lineDecor: CSSObject = {
        content: `""`,
        bg: color || "black",
        position: "absolute",
        width: { base: "50%", md: "100%" },
        h: "2px",
        top: "50%",
    };

    return (
        <Flex w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Heading
                textAlign={"center"}
                _after={{
                    ...lineDecor,
                    left: "110%",
                }}
                _before={{
                    ...lineDecor,
                    right: "110%",
                }}
                position={"relative"}
                my={"4"}
                color={color}
            >
                {children}
            </Heading>
        </Flex>
    );
};

export default SectionHeading;
