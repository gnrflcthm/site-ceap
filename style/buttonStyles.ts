export const ButtonStyles = {
    baseStyle: {
        w: "full",
        textTransform: "uppercase",
        border: "2px solid transparent",
        rounded: "sm",
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
    },
};