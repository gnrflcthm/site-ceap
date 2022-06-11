import { extendTheme } from "@chakra-ui/react";
import { whiten } from '@chakra-ui/theme-tools'

export const appTheme = extendTheme({
    colors: {
        primary: {
            base: "#0F164A",
        },
    },
    fonts: {
        heading: "Roboto, Helvetica, sans-serif",
        body: "Roboto, Helvetica, sans-serif"
    },
});