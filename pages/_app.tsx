import { AppProps } from "next/app";
import Head from "next/head";

import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";
import { appTheme } from "../style/theme";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "../style/georgia.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS={true} theme={appTheme}>
            <Head>
                <link rel={"icon"} href={"logo.png"} />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}
