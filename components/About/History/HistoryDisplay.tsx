import { FC} from "react";

import { Box, Flex, Heading,  VStack } from "@chakra-ui/react";


import HistoryItem from "./HistoryItem";

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
    return (
        <Flex
            flexDir={"column"}
            justify={"flex-start"}
            position={"relative"}
            px={"8"}
            py={"10"}
            bg={"primary"}
            overflow={'hidden'}
        >
            <Heading mb={"10"} position={"relative"} color={"neutralizerLight"}>
                Our Story
            </Heading>
            <VStack
                w={"full"}
                align={"flex-start"}
                spacing={"8"}
                position={"relative"}
            >
                {content.map(({ heading, text }, i) => (
                    <HistoryItem key={i} heading={heading} story={text} />
                ))}
            </VStack>
            <Flex
                position={"absolute"}
                px={"2"}
                h={"full"}
                top={"24"}
                left={"8"}
                justify={"center"}
                align={"center"}
            >
                <Box
                    bg={"secondary"}
                    w={"0.5"}
                    h={"full"}
                    rounded={"full"}
                    transform={"auto"}
                    transformOrigin={"center"}
                    scaleX={"1.5"}
                />
            </Flex>
        </Flex>
    );
};

export default HistoryDisplay;
