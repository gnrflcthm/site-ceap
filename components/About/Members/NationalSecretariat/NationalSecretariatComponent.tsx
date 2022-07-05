import { FC } from "react";
import { Center, Box, Flex, Text, Image, ListItem, UnorderedList, } from "@chakra-ui/react";
import { MemberImage } from "../ImageComponent";
import img1 from "../../../../assets/National Secretariat/1.jpg"
import img2 from "../../../../assets/National Secretariat/2.jpg"
import img3 from "../../../../assets/National Secretariat/3.jpg"
import img4 from "../../../../assets/National Secretariat/4.jpg"
import img5 from "../../../../assets/National Secretariat/5.jpg"
import img6 from "../../../../assets/National Secretariat/6.jpg"
import img7 from "../../../../assets/National Secretariat/7.jpg"
import img8 from "../../../../assets/National Secretariat/8.jpg"
import img9 from "../../../../assets/National Secretariat/9.jpg"
import img10 from "../../../../assets/National Secretariat/10.jpg"
import img11 from "../../../../assets/National Secretariat/11.jpg"
import img12 from "../../../../assets/National Secretariat/12.jpg"
import img13 from "../../../../assets/National Secretariat/13.jpg"

const CommissionsCommittees: FC = () => {
    return (
        <Box bg='primary' w='100%' h='100%' p={10} my={"10"} color='white'>
            <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>NATIONAL SECRETARIAT</Text>
            <Flex align={"center"} minHeight='max-content' flexDir={"column"}>
                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img1.src} name="MR. JOSE ALLAN I. ARELLANO" position="EXECUTIVE DIRECTOR"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img2.src} name="MS. MARY ANN S. CRUZ" position="DEPUTY EXECUTIVE DIRECTOR; PLANS AND PROGRAMS OFFICER" description="Areas: National Christian Formation Commission (NCFC) Programs Committee - Justice and Peace, Ecological Integrity, Engaged Citizenship, Poverty Reduction, Gender Equality, Youth Empowerment (JEEPGY)"></MemberImage>
                            <MemberImage src={img3.src} name="MRS. ROWENA R. CAVERTE" position="COMPTROLLER" description="Finance and Administrative Officer"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img4.src} name="MS. LALAINE V. ROMERO" position="RESEARCH COORDINATOR" description="RESEARCH WORK"></MemberImage>
                        </Flex>

                    </Flex>
                </Box>

                <Box borderRadius='20' w='70%' bg='white' h='100%' p={10} my={"10"} mx={"5"} color='primary'>
                    <Flex margin={"auto"} width={"70%"} flexDir={"column"} justifyContent={"center"}>
                        <Text align={"center"} p={5} fontSize='25px' fontStyle="italic" fontWeight="bold">ASSISTANTS AND SUPPORT PERSONNEL</Text>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img5.src} name="MRS. ANA LIZA G. ENGUITO" position="FINANCE AND ADMINISTRATIVE"></MemberImage>
                            <MemberImage src={img6.src} name="MS. DARLENE ANN C. BUSMENTE" position="PCSS STAFF"></MemberImage>
                            <MemberImage src={img7.src} name="MS. JANICE QUIRINO" position="ACCOUNTING STAFF"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img8.src} name="MS. MARINELLE C. GABOY" position="PLANS AND PROGRAMS"></MemberImage>
                            <MemberImage src={img9.src} name="MS. KEANA RIVERA" position="ADVOCACY AND SPECIAL EVENTS"></MemberImage>
                            <MemberImage src={img10.src} name="MR. CHRISTIAN BIEN H. LAGMAY" position="RESEARCH ASSISTANT"></MemberImage>
                        </Flex>
                        <Flex width={"100%"} flexDir={"row"} justifyContent={"center"} align='stretch'>
                            <MemberImage src={img11.src} name="MR. TRISTAN JOY L. MANALILI" position="COMMUNICATION ASSISTANT"></MemberImage>
                            <MemberImage src={img12.src} name="MR. MARLON D. CUADRANTE" position="TECHNICAL SUPPORT"></MemberImage>
                            <MemberImage src={img13.src} name="MR. REÑEL ARRIESGADO" position="MAINTENANCE"></MemberImage>
                        </Flex>
                    </Flex>
                </Box>

            </Flex>
        </Box>
    );
};

export default CommissionsCommittees;