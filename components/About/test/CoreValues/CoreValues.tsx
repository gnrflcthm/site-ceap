import { FC } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import img1 from "../../../../assets/val-1.png";
import img2 from "../../../../assets/val-2.png";
import img3 from "../../../../assets/val-3.png";
import img4 from "../../../../assets/val-4.png";
import img5 from "../../../../assets/val-5.png";
import img6 from "../../../../assets/val-6.png";
import CoreValueObject from "./CoreValueObject";

const CoreValues: FC = () => {
    return (
        <Box
            bg="primary"
            w={"full"}
            h={"full"}
            p={"10"}
            color={"white"}
        >
            <Heading
                as={"h2"}
                textAlign={"center"}
                fontWeight="bold"
                fontStyle="italic"
                fontSize="4xl"
            >
                Core Values
            </Heading>
            <Flex
                justifyContent={"center"}
                alignItems={"space-between"}
                flexWrap={"wrap"}
                w={"full"}
            >
                <CoreValueObject icon={img1} />
                <CoreValueObject icon={img2} />
                <CoreValueObject icon={img3} />
                <CoreValueObject icon={img4} />
                <CoreValueObject icon={img5} />
                <CoreValueObject icon={img6} />
            </Flex>
        </Box>
    );
};

export default CoreValues;