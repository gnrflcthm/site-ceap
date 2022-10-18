import { useState } from "react";

import Layout from "@components/Layout";
import { PageWithLayout } from "../_app";

import {
    Box,
    Flex,
    Text,
    Heading,
    Image,
    VStack,
    SimpleGrid,
} from "@chakra-ui/react";

import landingBg from "@assets/aboutimghd.jpg";
import coreNavLogo from "@assets/CORE_Nav.png";

import SearchBar from "@components/SearchBar";
import Catalogue from "@components/Resources";
import Head from "next/head";

const Resources: PageWithLayout = () => {
    // TODO: Add condition if there is a specified file path. (display different interface)
    const [query, setQuery] = useState<string>("");
    return (
        <>
            <Head>
                <title>CORE</title>
            </Head>
            <Flex
                flexDir={"column"}
                w={"full"}
                flex={"1"}
                overflow={"auto"}
                overflowX={"hidden"}
            >
                <Flex
                    w={"full"}
                    justify={"center"}
                    align={"center"}
                    h={"50%"}
                    bg={`url(${landingBg.src})`}
                    bgPos={"center"}
                    bgSize={"cover"}
                    _before={{
                        content: `""`,
                        position: "absolute",
                        top: "0",
                        left: "0",
                        w: "full",
                        h: "full",
                        bg: "blackAlpha.700",
                        backdropFilter: "auto",
                        backdropBlur: "sm",
                    }}
                    position={"relative"}
                >
                    <VStack
                        justify={"center"}
                        align={"center"}
                        py={"20"}
                        spacing={"4"}
                        position={"relative"}
                        w={"full"}
                    >
                        <Image src={coreNavLogo.src} w={"25%"} />
                        <Text color={"neutralizerLight"}>
                            CORE is a repository of educational resources and institutional documents for CEAP member schools' teachers and administrators.
                        </Text>
                        <SearchBar {...{ query, setQuery }} />
                    </VStack>
                </Flex>
                <Catalogue />
            </Flex>
        </>
    );
};

Resources.PageLayout = Layout;

export default Resources;
