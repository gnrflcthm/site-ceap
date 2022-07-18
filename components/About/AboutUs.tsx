import { FC } from "react";

import { Flex, Text, VStack, Box, Heading } from "@chakra-ui/react";

import coverImage from "../../assets/aboutimghd.jpg";

const aboutContent = [
    `The <b>Catholic Educational Association of the Philippines (CEAP)</b> is the national association of Catholic Educational Institutions in the Philippines founded in <b>1941</b>. It now has more than <b>1</b>,<b>525</b> member-schools and more than <b>120</b> superintendents of Catholic Schools. It is a voluntary organization which operates through regional educational associations located in the <b>17</b> regions of the country.`,
    `The <b>CEAP</b> represents the interests of Catholic educational institutions in national and international fora; fosters unity of action with other organizations in educational matters; and assists members, particularly those in mission areas to achieve common and specific aims.`,
    `The <b>CEAP</b> is commissioned to advance and promote the teaching function of the Catholic Church. It contributes towards the attainment of the objective “the total development of the human person,” through a Catholic orientation in accordance with the norms of the Church, consistent with national development goals as expressed in the Philippine Constitution.`,
    `The <b>CEAP</b> promotes religious instruction as an essential element of Catholic education, thereby contributing towards character formation and citizenship building.`,
    `Moreover, it strives to respond to social, political, moral and other critical issues based on consultations with the different regions and calls for the collective action of its members when the situation so requires.`,
    `<b>CEAP</b> is a non-stock, non-profit organization. It is represented in the <b>Coordinating Council of Private Educational Associations (COCOPEA)</b>, <b>Private Education Assistance Committee - Fund for Assistance to Private Education (PEAC-FAPE)</b>, and the various Technical Working Groups and Committees of national government agencies working for the interest of the private schools.`,
    `It is a member of the Association of Foundations and networks with many other non-government organizations. It is affiliated with the International <b>Office of Catholic Education (Office Internationale de l'Enseignement Catholique-OIEC)</b> and with the International Federation of Catholic Universities.`,
];

const AboutUs: FC = () => {
    return (
        <Flex
            flexDir={"column"}
            justify={"flex-start"}
            align={"stretch"}
            pb={"10"}
            px={{ base: "4", lg: "8" }}
            color={"neutralizerLight"}
            position={"relative"}
            overflow={"hidden"}
        >
            <Box
                w={"full"}
                h={"full"}
                position={"absolute"}
                top={"0"}
                left={"0"}
                bgImage={coverImage.src}
                bgSize={"cover"}
                bgPosition={"center"}
                bgAttachment={"fixed"}
            />
            <Box
                w={"30%"}
                h={"full"}
                position={"absolute"}
                top={"-25%"}
                left={"-15%"}
                bgColor={"primary"}
                transform={"auto"}
                rotate={"30deg"}
                scaleY={"1.5"}
                bgSize={"cover"}
                bgPosition={"center"}
                bgAttachment={"fixed"}
            />
            <Box
                w={"30%"}
                h={"full"}
                position={"absolute"}
                top={"25%"}
                right={"-15%"}
                bgColor={"primary"}
                transform={"auto"}
                rotate={"30deg"}
                scaleY={"1.5"}
                bgSize={"cover"}
                bgPosition={"center"}
                bgAttachment={"fixed"}
            />
            <Heading py={"10"} zIndex={"3"} color={"neutralizerLight"}>
                About Us
            </Heading>
            <VStack zIndex={"3"} p={"4"} position={"relative"}>
                <Box
                    position={"absolute"}
                    top={"0"}
                    left={"0"}
                    bg={"primary"}
                    opacity={"0.9"}
                    w={"full"}
                    h={"full"}
                />
                {aboutContent.map((val, i) => (
                    <Text
                        key={i}
                        dangerouslySetInnerHTML={{ __html: val }}
                        zIndex={"3"}
                    />
                ))}
            </VStack>
        </Flex>
    );
};

export default AboutUs;
