import { FC } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import Slider, { Settings } from "react-slick";

import PartnerItem, { PartnerData } from "./PartnerItem";
import SectionHeading from "../../SectionHeading";

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
            p={{ base: "2", md: "4" }}
            bg={"textOnPrimary"}
        >
            <SectionHeading>Meet Our Partners</SectionHeading>
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
