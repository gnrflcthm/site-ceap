import { FC } from "react";
import { Center, Box, Flex, Text, ListItem, UnorderedList, } from "@chakra-ui/react";

const mission: FC = () => {
    return (
        <Box bg='primary' w='100%' h='100%' p={10} my={"10"} color='white'>
            <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>CEAP Mission & Goals</Text>
            <Text align={"center"} fontStyle="italic" fontSize='30px'>(2019 - 2021)</Text>
            <Center>
                <Flex align={"center"} minHeight='max-content' flexDir={"column"}>
                    <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                        <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                            <Text align={"center"} p={5} fontSize='25px' fontWeight="bold">To strengthen solidarity among member schools through Catholic education.</Text>
                            <Center>
                                <UnorderedList>
                                    <ListItem><Text fontSize='20px' my={"5"}>Results-driven, adequate, relevant, reliable, and timely data from CEAP member schools gathered</Text></ListItem>
                                    <ListItem><Text fontSize='20px' my={"5"}>Assistance that enables CEAP Member schools to meet the standards of quality education provided</Text></ListItem>
                                    <ListItem><Text fontSize='20px' my={"5"}>Assistance that enables CEAP Mission Schools to sustain themselves provided</Text></ListItem>
                                    <ListItem><Text fontSize='20px' my={"5"}>Solidarity among CEAP regions achieved</Text></ListItem>
                                </UnorderedList>
                            </Center>
                        </Flex>
                    </Box>

                    <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                        <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                            <Text align={"center"} paddingTop={5} fontSize='25px' fontWeight="bold">To champion relevant, inclusive, and transformative Catholic education</Text> <Text paddingBottom={5} align={"center"} fontSize='xl' fontStyle="italic" fontWeight="bold">- Sentire Cum Ecclessia</Text>
                            <Center>
                                <UnorderedList>
                                    <ListItem><Text fontSize='20px' my={"5"}>Extent of access, quality, and equity among our CEAP member schools measured and expanded</Text></ListItem>
                                    <ListItem><Text fontSize='20px' my={"5"}>New ways of evangelization and faith formation through the Philippine Catholic Schools Standards and school-based Christian formation programs implemented</Text></ListItem>
                                    <ListItem><Text fontSize='20px' my={"5"}>Efforts towards curriculum and materials development, teacher-training, sharing strategies, and discussion on other critical areas of concern in light of the K to 12, the fourth industrial revolution (4IR) and other developments in education continued</Text></ListItem>
                                </UnorderedList>
                            </Center>
                        </Flex>
                    </Box>

                    <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                        <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                            <Text align={"center"} p={5} fontSize='25px' fontWeight="bold">To be catalysts of change through dialogue, collaboration, and education in the different dimension of human life.</Text>
                            <Center>
                                <UnorderedList>
                                    <ListItem><Text fontSize='20px' my={"5"}>Impact of CEAP member-schools as agents of transformation determined</Text></ListItem>
                                    <ListItem><Text fontSize='20px' my={"5"}>Collaborations between various stakeholders to address identified issues initiated and actualized</Text></ListItem>
                                </UnorderedList>
                            </Center>
                        </Flex>
                    </Box>
                </Flex>
            </Center>
        </Box>
    );
};

export default mission;