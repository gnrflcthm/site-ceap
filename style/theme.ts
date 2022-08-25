import { extendTheme } from "@chakra-ui/react"; 

import { ButtonStyles as Button } from "./buttonStyles";
import { HeadingStyles as Heading } from "./headingStyles";
import { TextStyles as Text } from "./textStyles";

export const appTheme = extendTheme({
    colors: {
        primary: "#0F1A64",
        primaryAccent: "#2FDACF",
        primaryAlpha: "#0F1A64AA", 
        secondary: "#F78828",
        secondaryAccent: "#F1CC00",
        neutralizerLight: "#FFFDFA",
        neutralizerDark: "#303030"

    },
    components: {
        Button,
        Heading,
        Text
    },
    fonts: {
        heading: "Montserrat, Helvetica, sans-serif",
        body: "Montserrat, Helvetica, sans-serif"
    },
});