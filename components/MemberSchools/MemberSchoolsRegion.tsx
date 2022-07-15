import { FC } from "react";
import { Link, Center, Box, Flex, Text, ListItem, UnorderedList, VStack, Heading, Button, Divider, } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

const MemberSchoolsRegion: FC = () => {
    return (
        <Flex>
            <Box w={"md"} p={5} bg="#efefef">
                <Text fontSize={25} mb={5} align="center" fontWeight={"bold"}>REGIONS</Text>
                <Link>ALL</Link>
                <Divider borderColor={"primary"} />
                <Link>NCR</Link>
                <Divider borderColor={"primary"} />
                <Link>BARMM</Link>
                <Divider borderColor={"primary"} />
                <Link>CARAGA</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 1</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 2</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 3</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 4A</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 4B</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 5</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 6</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 7</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 8</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 9</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 10</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 11</Link>
                <Divider borderColor={"primary"} />
                <Link>Region 12</Link>
                <Divider borderColor={"primary"} />
                <Link>CAR</Link>
                <Divider borderColor={"primary"} />
                <Link>NIR</Link>
            </Box>
        </Flex>
    );
};

export default MemberSchoolsRegion;