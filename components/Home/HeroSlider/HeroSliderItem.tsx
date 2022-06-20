import { FC } from "react";

import Image, { StaticImageData, ImageProps } from "next/image";

import { Flex } from "@chakra-ui/react";

interface HeroSliderItemProps {
    image: string | StaticImageData;
}

const HeroSliderItem: FC<HeroSliderItemProps> = ({ image }) => {
    var imageSettings: ImageProps = { src: image, objectFit: "cover" };

    if (typeof image === "string") {
        imageSettings = {
            ...imageSettings,
            src: image,
            layout: "fill",
        };
    } else {
        imageSettings = {
            ...imageSettings,
            src: image.src,
            height: image.height,
            width: image.width,
        };
    }

    return (
        <Flex
            height={{ base: "40vh", md: "80vh" }}
            w={"full"}
            objectFit={"cover"}
            overflow={"hidden"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image {...imageSettings} />
        </Flex>
    );
};

export default HeroSliderItem;
