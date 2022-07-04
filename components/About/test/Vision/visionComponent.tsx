import { FC } from "react";
import { Center, Box, Flex, Text, ListItem, UnorderedList, } from "@chakra-ui/react";

const vision: FC = () => {
    return (
        <Box bg='primary' w='100%' h='100%' p={10} my={"10"} color='white'>
            <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>Vision</Text>
            <Center>
                <Flex align={"center"} minHeight='max-content' flexDir={"column"}>
                    <Box borderRadius='20' w='100%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                        <Flex width={"100%"} flexDir={"column"} justifyContent={"center"}>
                            <Text align={"center"} p={5} fontSize='20px'>
                                A world transformed, a Philippines renewed by the people educated in the principles of <Text display={"inline"} as="span" fontSize='25px' fontWeight="Bold">Communio and Service</Text>
                            </Text>
                            <Text align={"center"} p={5} fontSize='20px'>
                                as taught and lived by our <Text display={"inline"} as="span" fontSize='25px' fontWeight="Bold">Lord Jesus Christ</Text> and shaped by the missionary mandate of
                            </Text>
                            <Text align={"center"} p={5} fontSize='20px'>
                                the <Text display={"inline"} as="span" fontSize='25px' fontWeight="Bold">Catholic Church.</Text>
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Center>
        </Box>
    );
};

export default vision;