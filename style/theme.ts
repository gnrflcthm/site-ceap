import { extendTheme } from "@chakra-ui/react"; 

export const appTheme = extendTheme({
    colors: {
        primary: "#18167B",
        textOnPrimary: "#EEEEEE",
        secondary: "#DCE6FF"
    },
    fonts: {
        heading: "Roboto, Helvetica, sans-serif",
        body: "Roboto, Helvetica, sans-serif"
    },
});