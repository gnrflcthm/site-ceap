import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";
import { appTheme } from "../style/theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider resetCSS={true} theme={appTheme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}
