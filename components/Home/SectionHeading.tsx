import { FC, PropsWithChildren } from "react";

import { CSSObject, Heading } from "@chakra-ui/react";

interface SectionHeadingProps extends PropsWithChildren {
    lineDecorColor?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({
    children,
    lineDecorColor,
}) => {
    const lineDecor: CSSObject = {
        content: `""`,
        bg: lineDecorColor || "black",
        position: "absolute",
        width: "100%",
        h: "2px",
        top: "50%",
    };

    return (
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
        >
            {children}
        </Heading>
    );
};

export default SectionHeading;
