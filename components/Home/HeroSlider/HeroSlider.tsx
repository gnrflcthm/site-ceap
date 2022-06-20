import { FC, ReactNode } from "react";

import Slider, { Settings } from "react-slick";

import { Flex } from "@chakra-ui/react";

interface HeroSliderProps {
    children: ReactNode;
}

const HeroSlider: FC<HeroSliderProps> = ({ children }) => {
    const heroSliderSettings: Settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true
    };

    return (
        <Flex
            display={{ base: "none", md: "flex" }}
            my={"20"}
            mx={"auto"}
            w={"80vw"}
            px={"10"}
            flexDir={"column"}
            justifyContent={"center"}
        >
            <Slider {...heroSliderSettings}>{children}</Slider>
        </Flex>
    );
};

export default HeroSlider;
