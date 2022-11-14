import { Button, Center, Text, useToken } from "@chakra-ui/react";
import { NextPage } from "next";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import bg from "@assets/aboutimghd.jpg";
import logo from "@assets/CORE_D.png";

const Error500: NextPage = () => {
    const [primary] = useToken("colors", ["primary"]);

    return (
        <>
            <Head>
                <title>500: Internal Server Error</title>
            </Head>
            <Center
                w={"100vw"}
                h={"100vh"}
                overflow={"hidden"}
                bg={`linear-gradient(${primary}99, ${primary}99), url(${bg.src})`}
                bgPos={"center"}
                bgAttachment={"fixed"}
                bgRepeat={"no-repeat"}
                bgSize={"cover"}
                flexDir={"column"}
            >
                <Image src={logo} width={logo.width / 8} height={logo.height / 8} />
                <Text
                    color={"neutralizerLight"}
                    fontWeight={"bold"}
                    my={"8"}
                    fontSize={"xl"}
                >
                    An Error Has Occured Processing Your Request.
                </Text>
                <Link href={"/"} passHref>
                    <Button
                        as={"a"}
                        w={"fit-content"}
                        variant={"secondary"}
                        color={"neutralizerLight !important"}
                    >
                        Return To Main Page
                    </Button>
                </Link>
            </Center>
        </>
    );
};

export default Error500;
