import { FC, useState } from "react";

import {
    Box,
    Flex,
    Heading,
    IconButton,
    Text,
    VStack,
} from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import HistoryNav from "./HistoryNav";

// Test Data
const content = [
    {
        heading: "sum title 1",
        text: [
            `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Similique, iste labore aliquam
            deleniti incidunt ea ab odio dignissimos tempora
            accusantium animi harum sunt exercitationem enim
            explicabo consequuntur autem ducimus provident!
            Iusto deserunt numquam assumenda soluta maxime
            nesciunt. Sunt, repellendus. Aliquam dicta eius,
            impedit sed a sapiente expedita amet asperiores
            tempora!`,
            `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Similique, iste labore aliquam
            deleniti incidunt ea ab odio dignissimos tempora
            accusantium animi harum sunt exercitationem enim
            explicabo consequuntur autem ducimus provident!
            Iusto deserunt numquam assumenda soluta maxime
            nesciunt. Sunt, repellendus. Aliquam dicta eius,
            impedit sed a sapiente expedita amet asperiores
            tempora!`,
            `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Similique, iste labore aliquam
            deleniti incidunt ea ab odio dignissimos tempora
            accusantium animi harum sunt exercitationem enim
            explicabo consequuntur autem ducimus provident!
            Iusto deserunt numquam assumenda soluta maxime
            nesciunt. Sunt, repellendus. Aliquam dicta eius,
            impedit sed a sapiente expedita amet asperiores
            tempora!`,
        ],
    },
    {
        heading: "another title",
        text: [
            `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Similique, iste labore aliquam
            deleniti incidunt ea ab odio dignissimos tempora
            accusantium animi harum sunt exercitationem enim
            explicabo consequuntur autem ducimus provident!
            Iusto deserunt numquam assumenda soluta maxime
            nesciunt. Sunt, repellendus. Aliquam dicta eius,
            impedit sed a sapiente expedita amet asperiores
            tempora!`,
        ],
    },
    {
        heading: "final title",
        text: [
            `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Similique, iste labore aliquam
            deleniti incidunt ea ab odio dignissimos tempora
            accusantium animi harum sunt exercitationem enim
            explicabo consequuntur autem ducimus provident!
            Iusto deserunt numquam assumenda soluta maxime
            nesciunt. Sunt, repellendus. Aliquam dicta eius,
            impedit sed a sapiente expedita amet asperiores
            tempora!`,
            `Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Similique, iste labore aliquam
            deleniti incidunt ea ab odio dignissimos tempora
            accusantium animi harum sunt exercitationem enim
            explicabo consequuntur autem ducimus provident!
            Iusto deserunt numquam assumenda soluta maxime
            nesciunt. Sunt, repellendus. Aliquam dicta eius,
            impedit sed a sapiente expedita amet asperiores
            tempora!`,
        ],
    },
];

const HistoryDisplay: FC = () => {
    const [[slide, direction], setSlide] = useState<[number, number]>([0, 1]);

    return (
        <Box w={"full"} h={"full"}>
            <Flex
                justifyContent={"space-evenly"}
                alignItems={"flex-end"}
                h={"10vh"}
            >
                {content.map(({ heading }, i) => (
                    <HistoryNav
                        title={heading}
                        active={content[slide].heading === heading}
                        onClick={() => setSlide([i, i < slide ? -1 : 1])}
                    />
                ))}
            </Flex>
            <Flex
                alignItems={"center"}
                h={"80vh"}
                position={"relative"}
                justifyContent={"space-between"}
                overflowX={"hidden"}
                overflowY={"auto"}
                bg={"primary"}
            >
                <Box
                    as={AnimatePresence}
                    position={"relative"}
                    minH={"80vh"}
                    p={"4"}
                >
                    <Box
                        key={slide}
                        as={motion.div}
                        position={"absolute"}
                        py={"4"}
                        px={"16"}
                        color={"textOnPrimary"}
                        initial={{ x: direction * 5 + "%", opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                bounce: 0.1,
                                bounceStiffness: 500,
                            },
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        <Heading>{content[slide].heading}</Heading>
                        <VStack spacing={"4"}>
                            {content[slide].text.map((text) => (
                                <Text>{text}</Text>
                            ))}
                        </VStack>
                    </Box>
                </Box>
                <IconButton
                    aria-label={"previous"}
                    icon={<BsFillCaretLeftFill />}
                    onClick={() => setSlide([Math.max(0, slide - 1), -1])}
                />
                <IconButton
                    aria-label={"next"}
                    icon={<BsFillCaretRightFill />}
                    onClick={() =>
                        setSlide([Math.min(content.length - 1, slide + 1), 1])
                    }
                />
            </Flex>
        </Box>
    );
};

export default HistoryDisplay;
