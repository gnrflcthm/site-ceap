import { FC } from "react";


import { Flex, Heading, Button, Box, VStack } from "@chakra-ui/react";

import HomeSectionLabel from "../HomeSectionLabel";
import PhotoItem from "./PhotoItem";

import i1 from "../../../assets/2.jpg";
import i2 from "../../../assets/1.jpg";
import i3 from "../../../assets/3.jpg";
import i4 from "../../../assets/4.jpg";
import i5 from "../../../assets/5.jpg";
import i6 from "../../../assets/6.jpg";

const tempImageData = [i1, i2, i3, i4, i5, i6, i1, i2];

const PhotoGallerySection: FC = () => {
    return (
        <VStack bg={"neutralizerLight"} align={"center"} py={"10"}>
            <VStack justify={"center"}>
                <HomeSectionLabel label={"Gallery"} />
                <Heading color={"primary"}>Our Photo Gallery</Heading>
            </VStack>
            <Flex
                justifyContent={"space-around"}
                flexWrap={"wrap"}
                w={"full"}
                px={"10"}
                py={"4"}
            >
                {tempImageData.map((img, i) => (
                    <PhotoItem image={img} key={i} />
                ))}
            </Flex>
            <Flex w={"full"} justify={"center"}>
                <Button
                    rounded={"none"}
                    bg={"secondary"}
                    color={"neutralizerLight"}
                    textTransform={"uppercase"}
                >
                    View More
                </Button>
            </Flex>
        </VStack>
    );
};

export default PhotoGallerySection;
