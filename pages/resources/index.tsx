import { useState, FormEvent, useMemo, useEffect } from "react";

import Layout from "@components/Layout";
import { PageWithLayout } from "../_app";

import { Flex, Text, Image, VStack, Box, useToken } from "@chakra-ui/react";

import landingBg from "@assets/aboutimghd.jpg";
import coreNavLogo from "@assets/CORE_Nav.png";

import SearchBar from "@components/SearchBar";
import Head from "next/head";
import { useRouter } from "next/router";
import Catalogue from "@components/Resources";

const Resources: PageWithLayout = () => {
    const [query, setQuery] = useState<string>("");

    const router = useRouter();

    const search = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/resources/search/?q=${query}`);
    };

    const [primary] = useToken("colors", ["primary"]);

    return (
        <>
            <Head>
                <title>CORE</title>
            </Head>
            <Flex
                position={"relative"}
                flexDir={"column"}
                w={"full"}
                h={"93vh"}
                maxH={"93vh"}
                flex={"1"}
                overflow={"auto"}
                overflowX={"hidden"}
                bg={`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${landingBg.src})`}
                bgPos={"center"}
                bgSize={"cover"}
                backdropBlur={"sm"}
            >
                <VStack
                    w={"full"}
                    h={"full"}
                    position={"relative"}
                    spacing={"0"}
                >
                    <VStack
                        justify={"center"}
                        align={"center"}
                        spacing={"10"}
                        position={"relative"}
                        py={"20"}
                        w={"full"}
                        bg={`${primary}CC`}
                    >
                        <Image src={coreNavLogo.src} w={"25%"} />
                        <Text color={"neutralizerLight"} textAlign={"center"}>
                            CORE is a repository of educational resources and
                            institutional documents for CEAP member schools'
                            teachers and administrators.
                        </Text>
                        <Box w={{ base: "full", lg: "50%" }}>
                            <SearchBar
                                {...{
                                    query,
                                    setQuery,
                                    onSearch: search,
                                    placeholder: "Search For Resources",
                                }}
                            />
                        </Box>
                    </VStack>
                    <Flex
                        w={"full"}
                        flexDir={"column"}
                        justify={"flex-start"}
                        align={"stretch"}
                        bg={"white"}
                        py={"20"}
                    >
                        <Text
                            fontWeight={"bold"}
                            color={"primary"}
                            fontSize={"5xl"}
                            textAlign={"center"}
                            mb={"10"}
                        >
                            Browse Our Catalogue
                        </Text>
                        <Catalogue />
                    </Flex>
                </VStack>
            </Flex>
        </>
    );
};

Resources.PageLayout = Layout;

export default Resources;
