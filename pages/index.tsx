import { FC } from "react";

import Image from "next/image";

import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";

import {
    HeroSlider,
    HeroSliderItem,
    NewsHighlights,
    NewsHighlight,
    MediaSlider,
} from "../components/Home";

import logo from "../public/logo.png";
import i1 from "../assets/2.jpg";

import i2 from "../assets/1.jpg";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpg";
import i5 from "../assets/5.jpg";
import i6 from "../assets/6.jpg";
import PartnersSlider from "../components/Home/PartnersSlider";

const images = [i2, i3, i4, i5, i6];

const Home: FC = () => {
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
        <Box
            bg={`linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${i1.src})`}
            bgAttachment={"fixed"}
            bgPos={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
        >
            <Flex
                as={"section"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                h={"50vh"}
                pt={{ base: "10", md: "0" }}
            >
                <Box as={Image} src={logo} objectFit={"contain"} />
                <Heading w={"40%"} textAlign={"center"}>
                    Catholic Educational Association Of The Philippines
                </Heading>
            </Flex>
            <HeroSlider>
                {images.map((src, i) => (
                    <HeroSliderItem image={src} key={i} />
                ))}
            </HeroSlider>
            <NewsHighlights newsData={newsHighlights} />
            <MediaSlider images={images.map((val) => val.src)} />
            <PartnersSlider
                partners={images.map((val) => ({ logo: val.src }))}
            />
        </Box>
    );
};

export default Home;
