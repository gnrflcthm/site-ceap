import { NextPage } from "next";
import Head from "next/head";

import { Box } from "@chakra-ui/react";

import {
    HeroSection,
    PhotoGallerySection,
    QuickLinksSection,
    VideoGallerySection
} from "../components/Home";

import i1 from "../assets/2.jpg";

import i2 from "../assets/1.jpg";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpg";
import i5 from "../assets/5.jpg";
import i6 from "../assets/6.jpg";

const images = [i2, i3, i4, i5, i6];

const Home: NextPage = () => {
    const newsHighlights: NewsHighlight[] = [
        {
            coverPhoto: i2,
            headline: "Hatdog",
            story: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos soluta expedita assumenda ratione temporibus sapiente voluptate illo quos aliquam deserunt aliquid et error, nemo ea eveniet rem porro blanditiis corrupti. At, maiores natus minus nisi enim, adipisci temporibus sit necessitatibus iste labore perspiciatis quam doloribus ab optio! Suscipit, numquam dolorem.",
            date: new Date(2001, 7, 13),
        },
        {
            coverPhoto: i3,
            headline: "Hatdog",
            story: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos soluta expedita assumenda ratione temporibus sapiente voluptate illo quos aliquam deserunt aliquid et error, nemo ea eveniet rem porro blanditiis corrupti. At, maiores natus minus nisi enim, adipisci temporibus sit necessitatibus iste labore perspiciatis quam doloribus ab optio! Suscipit, numquam dolorem.",
            date: new Date(2001, 7, 13),
        },
        {
            coverPhoto: i4,
            headline: "Hatdog",
            story: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos soluta expedita assumenda ratione temporibus sapiente voluptate illo quos aliquam deserunt aliquid et error, nemo ea eveniet rem porro blanditiis corrupti. At, maiores natus minus nisi enim, adipisci temporibus sit necessitatibus iste labore perspiciatis quam doloribus ab optio! Suscipit, numquam dolorem.",
            date: new Date(2001, 7, 13),
        },
    ];

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Box
                bg={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${i1.src})`}
                bgAttachment={"fixed"}
                bgPos={"center"}
                bgRepeat={"no-repeat"}
                bgSize={"cover"}
                m={"0"}
            >
                <HeroSection />
                <QuickLinksSection />
                <VideoGallerySection />
                <PhotoGallerySection />
            </Box>
        </>
    );
};

export default Home;
