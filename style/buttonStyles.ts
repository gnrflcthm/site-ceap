import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyles: ComponentStyleConfig = {
    baseStyle: {
        w: "full",
        textTransform: "uppercase",
        border: "2px solid transparent",
        rounded: "sm",
        bg: "neutralizerLight",
        borderColor: "transparent",
    },
    variants: {
        primary: {
            bg: "primary",
            color: "neutralizerLight",
            _hover: {
                bg: "transparent",
                color: "neutralizerDark",
                borderColor: "primary",
            },
        },
        secondary: {
            bg: "secondary",
            color: "neutralizerLight",
            _hover: {
                bg: "transparent",
                borderColor: "secondary",
                color: "neutralizerDark",
            },
        },
        link: {
            textTransform: "none",
            display: "inline",
            bg: "transparent",
            color: "primary",
            w: "fit-content",
            _hover: {
                color: "primaryAccent",
            },
        },
        transparent: {
            bg: "transparent",
            color: "neutralizerLight",
            _hover: {
                bg: "whiteAlpha.200",
            },
            w: "fit-content",
            rounded: "md",
        },
    },
    defaultProps: {
        variant: "primary",
    },
};
