import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";

import { ReactNode, ComponentType, useState, createContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { appTheme } from "../style/theme";

import { AuthProvider } from "../context/AuthContext";

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

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    PageLayout?: ComponentType<{ children: ReactNode }>;
    Title?: string;
};

export const CollapseContext = createContext<[boolean, Function]>([
    false,
    () => {},
]);

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: ComponentWithLayout) {
    const [collapseSidePanel, setCollapseSidePanel] = useState<boolean>(true);

    return (
        <ChakraProvider resetCSS={true} theme={appTheme}>
            <Head>
                <link rel={"icon"} href={"logo.png"} />
            </Head>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
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
                </AuthProvider>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
