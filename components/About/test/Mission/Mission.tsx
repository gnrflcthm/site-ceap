import { FC } from "react";
import { Heading, Box, VStack } from "@chakra-ui/react";
import MissionSegment from "./MissionSegment";

const Mission: FC = () => {
    return (
        <Box bg="primary" p={"10"} color="white">
            <Heading
                as={"h2"}
                textAlign={"center"}
                fontWeight={"bold"}
                fontStyle={"italic"}
                fontSize={"4xl"}
            >
                CEAP Mission & Goals
            </Heading>
            <Heading as={"h3"} textAlign={"center"} fontSize={"2xl"}>
                (2019-2021)
            </Heading>
            <VStack align={"center"} flexDir={"column"} mt={"10"}>
                <MissionSegment
                    heading={
                        "To strengthen solidarity among member schools through Catholic education."
                    }
                    details={[
                        "Results-driven, adequate, relevant, reliable, and timely data from CEAP member schools gathered",
                        "Assistance that enables CEAP Member schools to meet the standards of quality education provided",
                        "Assistance that enables CEAP Mission Schools to sustain themselves provided",
                        "Solidarity among CEAP regions achieved",
                    ]}
                />
                <MissionSegment
                    heading={
                        "To champion relevant, inclusive, and transformative Catholic education - Sentire Cum Ecclessia"
                    }
                    details={[
                        "Extent of access, quality, and equity among our CEAP member schools measured and expanded",
                        "New ways of evangelization and faith formation through the Philippine Catholic Schools Standards and school-based Christian formation programs implemented",
                        "Efforts towards curriculum and materials development, teacher-training, sharing strategies, and discussion on other critical areas of concern in light of the K to 12, the fourth industrial revolution (4IR) and other developments in education continued",
                    ]}
                />
                <MissionSegment
                    heading={
                        "To be catalysts of change through dialogue, collaboration, and education in the different dimension of human life"
                    }
                    details={[
                        "Impact of CEAP member-schools as agents of transformation determined",
                        "Collaborations between various stakeholders to address identified issues initiated and actualized",
                    ]}
                />
            </VStack>
        </Box>
    );
};

export default Mission;
