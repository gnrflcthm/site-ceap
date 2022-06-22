import { FC } from "react";

import Image from "next/image";

import { Flex, Box, Button } from "@chakra-ui/react";

import Slider, { Settings } from "react-slick";

import SectionHeading from "../SectionHeading";

interface MediaSliderProps {
    images: string[];
}

const MediaSlider: FC<MediaSliderProps> = ({ images }) => {
    const mediaSliderSettings: Settings = {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
    };
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            p={{ base: "2", md: "4" }}
        >
            <SectionHeading>Photos & Videos</SectionHeading>
            <Flex
                display={{ base: "none", md: "flex" }}
                my={"4"}
                mx={"auto"}
                w={"90vw"}
                px={"4"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"stretch"}
            >
                <Slider {...mediaSliderSettings}>
                    {images.map((src, i) => (
                        <Flex
                            display={"flex !important"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            w={"full"}
                            position={"relative"}
                            key={i}
                        >
                            <Box
                                h={"40"}
                                w={"64"}
                                position={"relative"}
                                objectFit={"cover"}
                            >
                                <Image
                                    src={src}
                                    layout={"fill"}
                                    objectFit={"cover"}
                                />
                            </Box>
                        </Flex>
                    ))}
                </Slider>
            </Flex>
            <Flex justifyContent={"end"} px={"8"} alignSelf={"end"}>
                <Button w={{ base: "full", md: "initial" }}>View More</Button>
            </Flex>
        </Flex>
    );
};

export default MediaSlider;
