import { FC } from "react";

import Image from "next/image";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

import Slider, { Settings } from "react-slick";

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
            p={"4"}
        >
            <Heading
                textAlign={"center"}
                _after={{
                    content: `""`,
                    bg: "black",
                    position: "absolute",
                    width: "100%",
                    h: "1",
                    top: "50%",
                    left: "110%"
                }}
                _before={{
                    content: `""`,
                    bg: "black",
                    position: "absolute",
                    width: "100%",
                    h: "1",
                    top: "50%",
                    right: "110%"
                }}
                position={"relative"}
            >
                Photos & Videos
            </Heading>
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
                        <Box
                            key={i}
                            h={"40vh"}
                            position={"relative"}
                            overflow={"hidden"}
                            objectFit={"contain"}
                        >
                            <Image
                                src={src}
                                layout={"fill"}
                                objectFit={"cover"}
                            />
                        </Box>
                    ))}
                </Slider>
            </Flex>
            <Flex justifyContent={"end"} w={"full"}>
                <Button>View More</Button>
            </Flex>
        </Flex>
    );
};

export default MediaSlider;
