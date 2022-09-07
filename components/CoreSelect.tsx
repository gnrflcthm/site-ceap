import { FC, useMemo, useState } from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { Box, chakra, Text, useToken } from "@chakra-ui/react";
import { MemberSchool, Prisma } from "@prisma/client";

interface OrganizationOption {
    label: string;
    value: string;
}

const CoreSelect: FC<{
    placeholder: string;
    value: {label: string, value: string} | undefined;
    setValue: Function;
    required: boolean;
    memberSchoolData:
        | (Prisma.PickArray<
              Prisma.MemberSchoolGroupByOutputType,
              ("region" | "id" | "name" | "address")[]
          > & {})[]
}> = ({ placeholder, value, setValue, required, memberSchoolData }) => {
    const [secondary, neutralizerDark] = useToken("colors", [
        "secondary",
        "neutralizerDark",
    ]);
    const [focused, setFocused] = useState<boolean>(false);
    const ChakraSelect = chakra(Select<OrganizationOption>);

    const options = useMemo(() => {
        let regions = memberSchoolData
            .map((field) => field.region)
            .filter((val, i, self) => self.indexOf(val) === i);

        let selectData = regions.map((region) => {
            let schools = memberSchoolData.filter(
                (field) => field.region === region
            );
            return {
                region,
                schools: schools.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                }),
            };
        });

        return selectData
            ? selectData.map(({ region, schools }) => ({
                  label: region,
                  options: schools
                      ? schools.map(({ name, id }) => ({
                            label: name,
                            value: id,
                        }))
                      : [],
              }))
            : [];
    }, [memberSchoolData]);

    return (
        <Box w={"full"} position={"relative"}>
            <ChakraSelect
                placeholder={""}
                onChange={(val) => setValue(val)}
                openMenuOnFocus={true}
                value={value ? { label: value.label, value: value.value } : undefined}
                options={options}
                styles={{
                    control: (base, { isFocused }) => ({
                        ...base,
                        borderColor: isFocused || value ? secondary : neutralizerDark,
                        boxShadow: isFocused
                            ? `0 0 0 1px ${secondary}`
                            : "none",
                        ":hover": {
                            borderColor: isFocused
                                ? secondary
                                : "hsl(0, 0%, 70%)",
                        },
                    }),
                    dropdownIndicator: (base, state) => ({
                        ...base,
                        color: state.isFocused ? secondary : base.color,
                        ":hover": {
                            color: state.isFocused ? secondary : base.color,
                        },
                    }),
                }}
            />
            <Text
                pos={"absolute"}
                fontSize={"sm"}
                color={focused || value ? "secondary" : "neutralizerDark"}
                top={focused || value ? "-30%" : "50%"}
                left={focused || value ? "0" : "4"}
                transform={"auto"}
                translateY={"-50%"}
                transition={"all 0.2s ease"}
                pointerEvents={"none"}
            >
                {placeholder}
                {required && "*"}
            </Text>
        </Box>
    );
};

export default CoreSelect;
