import { FC } from "react";

import { Flex, Heading } from "@chakra-ui/react";

import MissionItem from "./MissionItem";
import MVCVHeading from "./MVCVHeading";

type MissionData = Array<{ heading: string; goals: string[] }>;

const missionData: MissionData = [
    {
        heading:
            "To strengthen solidarity among member schools through Catholic education.",
        goals: [
            "Results-driven, adequate, relevant, reliable, and timely data from CEAP member schools gathered",
            "Assistance that enables CEAP Member schools to meet the standards of quality education provided",
            "Assistance that enables CEAP Mission Schools to sustain themselves provided",
            "Solidarity among CEAP regions achieved",
        ],
    },
    {
        heading:
            "To champion relevant, inclusive, and transformative Catholic education - Sentire Cum Ecclessia",
        goals: [
            "Extent of access, quality, and equity among our CEAP member schools measured and expanded",
            "New ways of evangelization and faith formation through the Philippine Catholic Schools Standards and school-based Christian formation programs implemented",
            "Efforts towards curriculum and materials development, teacher-training, sharing strategies, and discussion on other critical areas of concern in light of the K to 12, the fourth industrial revolution (4IR) and other developments in education continued",
        ],
    },
    {
        heading:
            "To be catalysts of change through dialogue, collaboration, and education in the different dimension of human life",
        goals: [
            "Impact of CEAP member-schools as agents of transformation determined",
            "Collaborations between various stakeholders to address identified issues initiated and actualized",
        ],
    },
];

const MissionComponent: FC = () => {
    return (
        <Flex flexDir={"column"} zIndex={"3"} w={"full"}>
            <MVCVHeading heading={"Our Mission And Goals"} />
            <Flex justify={"space-around"} align={"stretch"}>
                {missionData.map((mission, i) => (
                    <MissionItem {...mission} key={i} />
                ))}
            </Flex>
        </Flex>
    );
};

export default MissionComponent;
