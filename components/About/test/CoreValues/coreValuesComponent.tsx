import { FC } from "react";
import { Center, Box, Flex, Text, Image } from "@chakra-ui/react";
import img1 from "../../../../assets/val-1.png";
import img2 from "../../../../assets/val-2.png";
import img3 from "../../../../assets/val-3.png";
import img4 from "../../../../assets/val-4.png";
import img5 from "../../../../assets/val-5.png";
import img6 from "../../../../assets/val-6.png";

const coreValues: FC = () => {
    return (
        <Box bg='primary' w='100%' h='100%' p={10} my={"10"} color='white'>
            <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>Core Values</Text>
            <Center>
                <Flex align={"center"} minHeight='max-content' flexDir={"column"}>
                    <Flex width={"100%"} flexDir={"row"} justifyContent={"center"}>
                        <Box borderRadius='20' w='100%' bg='white' h='100%' p={5} my={"10"} mx={"20"} color='primary'>
                            <Image src={img1.src}></Image>
                        </Box>
                        <Box borderRadius='20' w='100%' bg='white' h='100%' p={5} my={"10"} mx={"20"} color='primary'>
                            <Image src={img2.src}></Image>
                        </Box>
                        <Box borderRadius='20' w='100%' bg='white' h='100%' p={5} my={"10"} mx={"20"} color='primary'>
                            <Image src={img3.src}></Image>
                        </Box>
                    </Flex>

                    <Flex width={"100%"} flexDir={"row"} justifyContent={"center"}>
                        <Box borderRadius='20' w='100%' bg='white' h='100%' p={5} my={"10"} mx={"20"} color='primary'>
                            <Image src={img4.src}></Image>
                        </Box>
                        <Box borderRadius='20' w='100%' bg='white' h='100%' p={5} my={"10"} mx={"20"} color='primary'>
                            <Image src={img5.src}></Image>
                        </Box>
                        <Box borderRadius='20' w='100%' bg='white' h='100%' p={5} my={"10"} mx={"20"} color='primary'>
                            <Image src={img6.src}></Image>
                        </Box>
                    </Flex>
                </Flex>
            </Center>
        </Box>
    );
};

export default coreValues;