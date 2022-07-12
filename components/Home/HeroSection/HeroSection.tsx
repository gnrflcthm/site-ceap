import { FC, useEffect, useState } from "react";

import { Flex, Box, HStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import HeroItem from "./HeroItem";

import i1 from "../../../assets/1.jpg";
import i2 from "../../../assets/2.jpg";

const tempData = [
    {
        headline: "TEST",
        story: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, tenetur?",
        coverImage: i1.src,
    },
    {
        headline: "CEAP C.O.N.G.R.E.S.S.",
        story: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, rerum.",
        coverImage: i2.src,
    },
];

const HeroSection: FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setCurrentSlide((val) => (val + 1) % tempData.length);
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Box minH={"85vh"} px={"12"} position={"relative"}>
            <Box as={AnimatePresence} flex={"1"} position={"relative"}>
                <Flex
                    flexDir={"column"}
                    as={motion.div}
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    h={"full"}
                    w={"full"}
                    position={"absolute"}
                    top={"0"}
                    left={"0"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    px={"10"}
                >
                    <HeroItem {...tempData[currentSlide]} />
                </Flex>
            </Box>
            <HStack
                flex={"1"}
                align={"center"}
                justify={"center"}
                position={"absolute"}
                bottom={"8"}
                left={"50%"}
                translateX={"-50%"}
                transform={"auto"}
                zIndex={"10"}
            >
                {tempData.map((_, i) => (
                    <Box
                        key={i}
                        as={"button"}
                        py={"0.5"}
                        w={"8"}
                        onClick={() => setCurrentSlide(i)}
                        bg={
                            currentSlide === i
                                ? "secondary"
                                : "neutralizerLight"
                        }
                    />
                ))}
            </HStack>
        </Box>
    );
};

export default HeroSection;
