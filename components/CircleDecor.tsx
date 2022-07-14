import { FC } from "react";

import { Box } from "@chakra-ui/react";

interface CircleDecorProps {
    top?: string | number;
    left?: string | number;
    bottom?: string | number;
    right?: string | number;
    color?: string;
    scale?: string | number;
}

const CircleDecor: FC<CircleDecorProps> = ({
    top = "initial",
    left = "initial",
    bottom = "initial",
    right = "initial",
    color = "initial",
    scale = "initial",
}) => {
    return (
        <Box
            position={"absolute"}
            rounded={"full"}
            transform={"auto"}
            w={"20"}
            h={"20"}
            bg={color}
            top={top}
            left={left}
            bottom={bottom}
            right={right}
            scale={scale}
        />
    );
};

export default CircleDecor;