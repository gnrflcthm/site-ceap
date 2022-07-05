import { FC } from "react";
import { Center, Box, Flex, Text, Image, ListItem, UnorderedList, } from "@chakra-ui/react";
import { MemberImage } from "../ImageComponent";
import img1 from "../../../../assets/Board Of Trustees/image1.jpg"
import img2 from "../../../../assets/Board Of Trustees/image2.jpg"
import img3 from "../../../../assets/Board Of Trustees/image3.jpg"
import img4 from "../../../../assets/Board Of Trustees/image4.jpg"
import img5 from "../../../../assets/Board Of Trustees/image6.jpg"
import img6 from "../../../../assets/Board Of Trustees/image7.jpg"
import img7 from "../../../../assets/Board Of Trustees/image8.jpg"
import img8 from "../../../../assets/Board Of Trustees/image9.jpg"
import img9 from "../../../../assets/Board Of Trustees/image10.jpg"
import img10 from "../../../../assets/Board Of Trustees/image11.jpg"
import img11 from "../../../../assets/Board Of Trustees/image12.jpg"
import img12 from "../../../../assets/Board Of Trustees/image13.jpg"
import img13 from "../../../../assets/Board Of Trustees/image14.jpg"
import img14 from "../../../../assets/Board Of Trustees/image15.jpg"
import img15 from "../../../../assets/Board Of Trustees/image16.jpg"
import img16 from "../../../../assets/Board Of Trustees/image17.jpg"
import img17 from "../../../../assets/Board Of Trustees/image18.jpg"
import img18 from "../../../../assets/Board Of Trustees/image19.jpg"
import img19 from "../../../../assets/Board Of Trustees/image20.jpg"
import img20 from "../../../../assets/Board Of Trustees/image21.jpg"
import img21 from "../../../../assets/Board Of Trustees/image22.jpg"
import img22 from "../../../../assets/Board Of Trustees/image23.jpg"
import img23 from "../../../../assets/Board Of Trustees/image24.jpg"
import img24 from "../../../../assets/Board Of Trustees/image25.jpg"
import img25 from "../../../../assets/Board Of Trustees/image26.jpg"

const BoardOfTrustees: FC = () => {
    return (
        <Box bg='primary' w='100%' h='100%' p={10} my={"10"} color='white'>
            <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>BOARD OF TRUSTEES</Text>
            <Text align={"center"} fontStyle="italic" fontSize='30px'>(2021-2022)</Text>

            <Flex align={"center"} minHeight='max-content' flexDir={"column"}>
                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">Executive Committee</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img1.src} name="SR. MA. MARISSA R. VIRI, RVM" position="President, Trustee-at-Large" description="President, University of the Immaculate Conception-Davao"></MemberImage>
                            <MemberImage src={img2.src} name="FR. THADEU ENRIQUE N. BALONGAG" position="Vice-President" description="Superintendent, Diocese of Dumaguete"></MemberImage>
                            <MemberImage src={img3.src} name="FR. ALBERT N. DELVOR" position="Treasurer, Trustee-at-Large" description="Superintendent, Diocese of Novaliches"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img4.src} name="FR. GILBERT B. SALES, CICM" position="Corporate Secretary" description="President, St. Louis University-Baguio"></MemberImage>
                            <MemberImage src={img5.src} name="JOSE ALLAN I. ARELLANO" position="Executive Director"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>

                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">Executive Committee</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img6.src} name="SR. FELICITAS V. BERNARDO, SPC" description="Dean, Graduate School of St. Paul University Manila"></MemberImage>
                            <MemberImage src={img7.src} name="FR. ONOFRE G. INOCENCIO, JR. SDB" description="Superintendent, Don Bosco Schools"></MemberImage>
                            <MemberImage src={img8.src} name="FR. MAURICIO T. ULEP, CMF" description="School Director, Claret School of Quezon City"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>

                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">REGIONAL TRUSTEES</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img9.src} name="FR. NOLAN A. QUE" position="School Director, Roman Catholic Archbishop of Manila Educational System (RCAM ES Cluster 5 & 6)" location="NCR"></MemberImage>
                            <MemberImage src={img10.src} name="FR. THADEU ENRIQUE N. BALONGAG" position="Superintendent, Diocese of Dumaguete" location="NEGROS ISLAND"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img11.src} name="FR. RAMON R. CALUZA, CICM" position="President, St. Louis College San Fernando La Union" location="REGION I"></MemberImage>
                            <MemberImage src={img12.src} name="MSGR. GERARD ARISTON P. PEREZ" position="President, St. Joseph’s College of Baggao, Inc." location="REGION II"></MemberImage>
                            <MemberImage src={img13.src} name="MR. NARCY ADOR F. DIONISIO" position="Supervisor, Apo Jose Catholic Educational System Foundation, Inc. (ACES) Diocese of San Jose" location="REGION III"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img14.src} name="SR. LUZVIMINDA G. MOJICA, FdCC" position="Superintendent, Canossian Daughters of Charity Schools" location="REGION IV"></MemberImage>
                            <MemberImage src={img15.src} name="FR. ODINE L. AREOLA" position="President, Veritas College of Irosin" location="REGION V"></MemberImage>
                            <MemberImage src={img16.src} name="FR. JOSE GUALBERTO I. VILLASIS" position="President, Aklan Catholic College" location="REGION VI"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img17.src} name="FR. NARCISO A. CELLAN JR., SVD" position="President, University of San Carlos" location="REGION VII"></MemberImage>
                            <MemberImage src={img18.src} name="FR. REY ANTHONY P. NAVIDAD" position="Superintendent Diocese of Borongan Catholic Schools" location="REGION VIII"></MemberImage>
                            <MemberImage src={img19.src} name="FR. KAREL S. SAN JUAN, SJ" position="President, Ateneo de Zamboanga University" location="REGION IX"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img20.src} name="FR. MAX V. CEBALLOS, SSJV" position="Supirentendent, Archdiocese of Cagayan de Oro" location="REGION X"></MemberImage>
                            <MemberImage src={img21.src} name="BR. NOELVIC H. DELORIA, SC" position="President, Holy Cross of Davao College" location="REGION XI"></MemberImage>
                            <MemberImage src={img22.src} name="SR. MA. FE D. GERODIAS, RVM" position="President, Notre Dame – RVM College of Cotabato" location="REGION XII"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img23.src} name="FR. GILBERT B. SALES, CICM" position="President, St. Louis University" location="CAR"></MemberImage>
                            <MemberImage src={img24.src} name="SR. ROSANNE MALLILLIN, SPC" position="President, St. Paul University Surigao" location="CARAGA"></MemberImage>
                            <MemberImage src={img25.src} name="FR. EDUARDO SANTOYO, OMI" position="President, Notre Dame of Jolo College, Sulu" location="BARMM"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default BoardOfTrustees;