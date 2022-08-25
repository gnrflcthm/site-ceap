import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import { ReactNode, ComponentType, useState, createContext } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { appTheme } from "../style/theme";

import { AuthProvider } from "../context/AuthContext";

import { COREContext } from "../context/CoreContext";

import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "../style/georgia.css";

type ComponentWithLayout = AppProps & {
    Component: AppProps["Component"] & {
        PageLayout: ComponentType<{ children: ReactNode }>;
        Title?: string;
    };
};

export type PageWithLayout = NextPage & {
    PageLayout?: ComponentType<{ children: ReactNode }>;
    Title?: string;
};

export const CollapseContext = createContext<[boolean, Function]>([false, () => {}]);

export default function App({ Component, pageProps }: ComponentWithLayout) {
    const [contentPage, setContentPage] = useState("resources");
    const [collapseSidePanel, setCollapseSidePanel] = useState<boolean>(false);

    return (
        <ChakraProvider resetCSS={true} theme={appTheme}>
            <Head>
                <link rel={"icon"} href={"logo.png"} />
            </Head>
            <AuthProvider>
                {/* <COREContext.Provider value={[contentPage, setContentPage]}> */}
                <CollapseContext.Provider
                    value={[collapseSidePanel, setCollapseSidePanel]}
                >
                    {Component.PageLayout ? (
                        <Component.PageLayout>
                            <Component {...pageProps} />
                        </Component.PageLayout>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </CollapseContext.Provider>
                {/* </COREContext.Provider> */}
            </AuthProvider>
        </ChakraProvider>
    );
}
