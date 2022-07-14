import { FC } from "react";

import { VStack, Flex, HStack, Heading, Box } from "@chakra-ui/react";

import img1 from "../../../assets/val-1.png";
import img2 from "../../../assets/val-2.png";
import img3 from "../../../assets/val-3.png";
import img4 from "../../../assets/val-4.png";
import img5 from "../../../assets/val-5.png";
import img6 from "../../../assets/val-6.png";

import MVCVHeading from "./MVCVHeading";
import CoreValueItem from "./CoreValueItem";

const coreValues = [img1, img2, img3, img4, img5, img6];

const CoreValues: FC = () => {
    return (
        <VStack w={"full"} zIndex={"3"}>
            <MVCVHeading heading={"Our Core Values"} />
            <HStack justify={"space-evenly"}>
                {coreValues.map((value, i) => (
                    <CoreValueItem src={value} key={i} />
                ))}
            </HStack>
        </VStack>
    );
};

export default CoreValues;
