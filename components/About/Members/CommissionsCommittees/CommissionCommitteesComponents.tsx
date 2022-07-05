import { FC } from "react";
import { Center, Box, Flex, Text, Image, ListItem, UnorderedList, } from "@chakra-ui/react";
import { MemberImage } from "../ImageComponent";
import img1 from "../../../../assets/Commissions and Committees/image1.jpg"
import img2 from "../../../../assets/Commissions and Committees/image2.jpg"
import img3 from "../../../../assets/Commissions and Committees/image3.jpg"
import img4 from "../../../../assets/Commissions and Committees/image4.jpg"
import img5 from "../../../../assets/Commissions and Committees/image5.jpg"
import img6 from "../../../../assets/Commissions and Committees/image6.jpg"
import img7 from "../../../../assets/Commissions and Committees/image7.jpg"
import img8 from "../../../../assets/Commissions and Committees/image8.jpg"
import img9 from "../../../../assets/Commissions and Committees/image9.jpg"
import img10 from "../../../../assets/Commissions and Committees/image10.jpg"
import img11 from "../../../../assets/Commissions and Committees/image11.jpg"
import img12 from "../../../../assets/Commissions and Committees/image12.jpg"
import img13 from "../../../../assets/Commissions and Committees/image13.jpg"
import img14 from "../../../../assets/Commissions and Committees/image14.jpg"
import img15 from "../../../../assets/Commissions and Committees/image15.jpg"
import img16 from "../../../../assets/Commissions and Committees/image16.jpg"
import img17 from "../../../../assets/Commissions and Committees/image17.jpg"
import img18 from "../../../../assets/Commissions and Committees/image18.jpg"
import img19 from "../../../../assets/Commissions and Committees/image19.jpg"
import img20 from "../../../../assets/Commissions and Committees/image20.jpg"
import img21 from "../../../../assets/Commissions and Committees/image21.jpg"
import img22 from "../../../../assets/Commissions and Committees/image22.jpg"
import img23 from "../../../../assets/Commissions and Committees/image23.jpg"

const CommissionsCommittees: FC = () => {
    return (
        <Box bg='primary' w='100%' h='100%' p={10} my={"10"} color='white'>
            <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>COMMISSIONS & COMMITTEES</Text>
            <Text align={"center"} fontStyle="italic" fontSize='30px'>(2021-2022)</Text>

            <Flex align={"center"} minHeight='max-content' flexDir={"column"}>
                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">NATIONAL COMMISSIONS CHAIRPERSONS</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img1.src} name="FR. RAYMOND JOSEPH L. ARRE" position="Superintendents Commission (SupCom)" description="Superintendent, Diocese of Cubao"></MemberImage>
                            <MemberImage src={img2.src} name="FR. KAREL S. SAN JUAN, SJ." position="National Advocacy Commission (NAC)"></MemberImage>
                            <MemberImage src={img3.src} name="FR. NOLAN A. QUE" position="National Christian Formation Commission (NCFC)"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img4.src} name="SR. FELICITAS V. BERNARDO, SPC." position="National Basic Education Commission (NBEC)"></MemberImage>
                            <MemberImage src={img5.src} name="FR. JOSE GUALBERTO I. VILLASIS" position="National Higher Education Commission (NHEC)"></MemberImage>
                            <MemberImage src={img6.src} name="FR. ONOFRE G. INOCENCIO, JR., SDB" position="National Technical-Vocational Education Commission (NTVEC)"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img7.src} name="FR. ALAIN P. MANALO" position="Philippine Catholic Schools Standards Commission (PCSS)"></MemberImage>
                        </Flex>

                    </Flex>
                </Box>

                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">NATIONAL COMMITTEES CHAIRPERSONS</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img8.src} name="FR. THADEU ENRIQUE N. BALONGAG" position="Programs Committee"></MemberImage>
                            <MemberImage src={img9.src} name="FR. GILBERT B. SALES, CICM" position="Membership and Awards Committee"></MemberImage>
                            <MemberImage src={img10.src} name="ATTY. SABINO PADILLA IV" position="Legal Committee"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img11.src} name="FR. ALBERT N. DELVO" position="Finance and Personnel Committee"></MemberImage>
                            <MemberImage src={img12.src} name="DR. PILAR I. ROMERO" position="Resesearch Committee"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>

                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">COORDINATING COUNCIL OF PRIVATE EDUCATIONAL ASSOCIATIONS (COCOPEA) REPRESENTATIVES</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img13.src} name="SR. MA. MARISSA R. VIRI, RVM"></MemberImage>
                            <MemberImage src={img14.src} name="FR. RAYMOND JOSEPH L. ARRE"></MemberImage>
                            <MemberImage src={img15.src} name="FR. ONOFRE G. INOCENCIO, JR. SDB"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img16.src} name="FR. GILBERT B. SALES, CICM"></MemberImage>
                            <MemberImage src={img17.src} name="MSGR. MICHAEL FELICIANO I. VENERACION"></MemberImage>
                            <MemberImage src={img18.src} name="DR. PILAR I. ROMERO"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>

                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img19.src} location="PEAC REPRESENTATIVE" name="SR. MA. MARISSA R. VIRI, RVM"></MemberImage>
                            <MemberImage src={img20.src} location="FAMI REPRESENTATIVE" name="FR. ALBERT N. DELVO"></MemberImage>
                            <MemberImage src={img21.src} location="OIEC REPRESENTATIVE" name="FR. ALAIN P. MANALO"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img22.src} location="LEGAL COUNSEL" name="ATTY. SABINO PADILLA IV"></MemberImage>
                            <MemberImage src={img23.src} location="CEAP EXECUTIVE DIRECTOR" name="MR. JOSE ALLAN I. ARELLANO"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default CommissionsCommittees;