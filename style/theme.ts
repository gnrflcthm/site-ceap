import { extendTheme } from "@chakra-ui/react"; 

export const appTheme = extendTheme({
    colors: {
        primary: "#0F1A64",
        primaryAccent: "#2FDACF",
        secondary: "#F78828",
        secondaryAccent: "#F1CC00",
        neutralizerLight: "#FFFDFA",
        neutralizerDark: "#303030"

    },
    fonts: {
        heading: "Montserrat, Helvetica, sans-serif",
        body: "Montserrat, Helvetica, sans-serif"
    },
});