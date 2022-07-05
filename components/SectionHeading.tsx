import { FC, PropsWithChildren } from "react";

import { CSSObject, Heading, Flex } from "@chakra-ui/react";

interface SectionHeadingProps extends PropsWithChildren {
    color?: string;
    my?: string | number;
}

const SectionHeading: FC<SectionHeadingProps> = ({ children, color, my }) => {
    const lineDecor: CSSObject = {
        content: `""`,
        bg: color || "black",
        position: "absolute",
        width: { base: "25%", md: "25%" },
        h: "2px",
        top: "50%",
    };

    return (
        <Flex w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Heading
                as={"h1"}
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
                my={my || 4}
                color={color}
            >
                {children}
            </Heading>
        </Flex>
    );
};

export default SectionHeading;
