import { FC, MouseEventHandler, useState } from "react";
import { VStack, Box, Flex, Button, Heading } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import { IconType } from "react-icons";

import HomeSectionLabel from "../HomeSectionLabel";
import VideoItem from "./VideoItem";

import i1 from "../../../assets/2.jpg";
import i2 from "../../../assets/1.jpg";
import i3 from "../../../assets/3.jpg";
import i4 from "../../../assets/4.jpg";
import i5 from "../../../assets/5.jpg";
import i6 from "../../../assets/6.jpg";

const tempImageData = [i1, i2, i3, i4, i5, i6, i1, i2];

const GalleryNav: FC<{
    onClick?: MouseEventHandler;
    icon?: IconType;
    disabled?: boolean;
}> = ({ onClick, icon, disabled }) => (
    <Box
        as={Button}
        zIndex={"3"}
        p={"0"}
        rounded={"none"}
        py={"10"}
        bg={"whiteAlpha.300"}
        onClick={onClick}
        color={"neutralizerLight"}
        disabled={disabled}
    >
        <Box as={icon} />
    </Box>
);

const VideoGallerySection: FC = () => {
    const [slides, setSlides] = useState<number[]>([0, 1, 2, 3]);
    const [base, setBase] = useState<number>(0);
    const [direction, setDirection] = useState<number>(-1);

    const nextSlide = () => {
        setDirection(1);
        setBase((val) => val + 4);
        setSlides((val) => val.map((val) => val + 4));
    };

    const prevSlide = () => {
        setDirection(-1);
        setBase((val) => val - 4);
        setSlides((val) => val.map((val) => val - 4));
    };

    return (
        <VStack
            py={"10"}
            bg={"secondary"}
            position={"relative"}
            overflow={"hidden"}
        >
            <HomeSectionLabel label={"Videos"} color={"primary"} />
            <Heading color={"neutralizerLight"} zIndex={"3"}>
                Our YouTube Channel
            </Heading>
            <Flex
                zIndex={"3"}
                position={"relative"}
                w={"full"}
                align={"stretch"}
                justify={"space-between"}
                py={"20"}
            >
                <GalleryNav
                    onClick={() => prevSlide()}
                    icon={BsCaretLeftFill}
                    disabled={base === 0}
                />
                <Box as={AnimatePresence}>
                    <Flex
                        key={base}
                        w={"full"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        as={motion.div}
                        position={"absolute"}
                        left={"0"}
                        top={"50%"}
                        transform={"auto"}
                        px={"10"}
                        initial={{
                            opacity: 0,
                            x: `${direction * 25}%`,
                            y: "-50%",
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: "-50%",
                            transition: {
                                type: "just",
                            },
                        }}
                        exit={{
                            opacity: 0,
                        }}
                    >
                        {slides.map((val, i) => (
                            <VideoItem thumbnail={tempImageData[val]} key={i} />
                        ))}
                    </Flex>
                </Box>
                <GalleryNav
                    onClick={() => nextSlide()}
                    icon={BsCaretRightFill}
                    disabled={base + 5 >= tempImageData.length}
                />
            </Flex>
            <Button
                rounded={"none"}
                textTransform={"uppercase"}
                color={"secondary"}
                bgColor={"neutralizerLight"}
                zIndex={"3"}
            >
                Visit Our Channel
            </Button>
            <Box
                h={"full"}
                w={"full"}
                position={"absolute"}
                top={"0"}
                left={"0"}
                transform={"auto"}
                transformOrigin={"center"}
                rotate={"-30deg"}
                bg={"whiteAlpha.300"}
                scaleX={"1.1"}
            />
        </VStack>
    );
};

export default VideoGallerySection;
