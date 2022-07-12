import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { Text, Tabs, TabList, TabPanels, Tab, TabPanel, Table, TableContainer, Thead, Tr, Th, Td, Tbody, Flex } from "@chakra-ui/react";

interface HistoryNavProps {
    active?: boolean;
    onClick?: MouseEventHandler;
}

const StrategicDirectionNav: FC<HistoryNavProps> = ({ active, onClick }) => {
    return (
        <Flex w={"100%"} justifyContent={"center"}>
            <Tabs size="md" variant='enclosed' my="5"
                bg="white"
                color={active ? "textOnPrimary" : "primary"}
                onClick={onClick}>
                <TabList>
                    <Tab fontWeight="bold">MISSION 1</Tab>
                    <Tab fontWeight="bold">MISSION 2</Tab>
                    <Tab fontWeight="bold">MISSION 3</Tab>
                </TabList>
                <TabPanels p='2rem'>
                    <TabPanel>
                        <Text>To promote solidarity among member schools through Catholic Education</Text>
                        <Text><Text as="span" fontWeight="bold">GOAL: </Text>Operational complementarity between regions and Execom/ Secretariat has been achieved</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td rowSpan={4}>Empowered Regional Councils</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td rowSpan={2}>The local Church is supportive of Catholic education</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2021</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Starting 2017</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>CEAP internal and external communication strengthened</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td rowSpan={4}>Empowered Regional Councils</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td rowSpan={2}>The local Church is supportive of Catholic education</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2021</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Starting 2017</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>Solidarity among the CEAP Regions is achieved</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>Small mission schools in CEAP have been assisted</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>
                    </TabPanel>

                    <TabPanel>
                        <Text>To foster inclusive and transformative Catholic Education</Text>
                        <Text><Text as="span" fontWeight="bold">GOAL: </Text>More CEAP Member - schools cater to marginalized student (e.g. culturally, intellectually, spiritually, a finncially impoverished)</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td rowSpan={4}>Empowered Regional Councils</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td rowSpan={2}>The local Church is supportive of Catholic education</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2021</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Starting 2017</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>CEAP Member - schools effectively deliver inclusive education</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td rowSpan={4}>Empowered Regional Councils</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td rowSpan={2}>The local Church is supportive of Catholic education</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2021</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Starting 2017</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>CSS adopted in all CEAP schools</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                    </TabPanel>

                    <TabPanel>
                        <Text>To serve as steadfast and effective catalyst of change through education in the different dimensions of human life</Text>
                        <Text><Text as="span" fontWeight="bold">GOAL: </Text>Transformative Education operationalized through JEEPGY directions and models in each educational level (i.e. basic, higher, graduate, post-graduate)</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td rowSpan={4}>Empowered Regional Councils</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td rowSpan={2}>The local Church is supportive of Catholic education</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2021</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Starting 2017</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>Promoted educational responses to contemporary challenges to Christian Faith and Culture (i.e. family life, children on OFW, migration, refugee, millenial generation, social media, prejudice and discrimination, culture of violence etc)</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td rowSpan={4}>Empowered Regional Councils</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>2017 onwards</Td>
                                    </Tr>
                                    <Tr>
                                        <Td rowSpan={2}>The local Church is supportive of Catholic education</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2021</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus.</Td>
                                        <Td>Starting 2017</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                        <Text my={"5"}><Text as="span" fontWeight="bold">GOAL: </Text>Determined the impact of CEAP member-schools as agents of transformation</Text>
                        <Flex align="center" direction="column" justifyContent={"center"}>
                            <Table mt={"5"} w={"80%"} variant='simple'>
                                <Thead bg={'#5cc8f1'}>
                                    <Tr>
                                        <Th>INDICATORS</Th>
                                        <Th>PROGRAM & ACTIVITIES</Th>
                                        <Th>PERSONS & COMMISSIONS</Th>
                                        <Th>TIME FRAME</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>Lorem ipsum dolor sit amet. Aut nihil omnis quo cupiditate harum non magnam dignissimos est doloremque tempore cum deleniti minus. </Td>
                                        <Td>2017-2018</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>

    );
};

export default StrategicDirectionNav;
