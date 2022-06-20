import { FC } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import Slider, { Settings } from "react-slick";

import PartnerItem, { PartnerData } from "./PartnerItem";

interface PartnersSliderProps {
    partners: PartnerData[];
}

const PartnersSlider: FC<PartnersSliderProps> = ({ partners }) => {
    const partnerSliderSettings: Settings = {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true,
    };

    return (
        <Flex
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            py={"4"}
            bg={"textOnPrimary"}
        >
            <Heading
                textAlign={"center"}
                my={"4"}
                position={"relative"}
                _after={{
                    content: `""`,
                    bg: "black",
                    position: "absolute",
                    width: "100%",
                    h: "1",
                    top: "50%",
                    left: "110%",
                }}
                _before={{
                    content: `""`,
                    bg: "black",
                    position: "absolute",
                    width: "100%",
                    h: "1",
                    top: "50%",
                    right: "110%",
                }}
            >
                Meet Our Partners
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
                <Slider {...partnerSliderSettings}>
                    {partners.map((src, i) => (
                        <PartnerItem key={i} {...src} />
                    ))}
                </Slider>
            </Flex>
        </Flex>
    );
};

export default PartnersSlider;
