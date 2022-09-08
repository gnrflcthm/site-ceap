import { FC, useState, FormEvent } from "react";

import {
    VStack,
    Button,
    Heading,
    CircularProgress,
    Text,
    Center,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

import CoreInput from "@components/CoreInput";
import CoreSelect from "@components/CoreSelect";

const RegistrationForm: FC<{
    memberSchools: any[];
    setState: Function;
}> = ({ memberSchools, setState }) => {
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [organization, setOrganization] = useState<
        | {
              label: string;
              value: string;
          }
        | undefined
    >(undefined);
    const [mobile, setMobile] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [schoolId, setSchoolId] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");

    const register = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("/api/user/register", {
                firstName,
                lastName,
                middleName,
                birthday,
                organizationId: organization?.value,
                email,
                mobile,
                schoolId,
            })
            .then(() => {
                setLoading(false);
                setState("success");
            })
            .catch((err: AxiosError) => {
                setError(err.response?.statusText);
                setLoading(false);
            });
    };
    return (
        <>
            <Heading fontSize={"3xl"} textAlign={"center"} mb={"4"}>
                Registration
            </Heading>
            <VStack spacing={"8"} w={"full"} as={"form"} onSubmit={register} onFocus={() => setError("")}>
                <CoreInput
                    placeholder={"Last Name"}
                    value={lastName}
                    setValue={setLastName}
                    required
                />
                <CoreInput
                    placeholder={"First Name"}
                    value={firstName}
                    setValue={setFirstName}
                    required
                />
                <CoreInput
                    placeholder={"Middle Name"}
                    value={middleName}
                    setValue={setMiddleName}
                    required
                />
                <CoreInput
                    placeholder={"Birthday"}
                    value={birthday}
                    setValue={setBirthday}
                    type={"date"}
                    required
                />
                <CoreSelect
                    placeholder={"School or Organization"}
                    value={organization}
                    setValue={setOrganization}
                    memberSchoolData={memberSchools}
                    required
                />
                <CoreInput
                    placeholder={"School ID"}
                    value={schoolId}
                    setValue={setSchoolId}
                />
                <CoreInput
                    placeholder={"Mobile Number."}
                    value={mobile}
                    setValue={setMobile}
                    type={"tel"}
                />
                <CoreInput
                    placeholder={"Email Address"}
                    value={email}
                    setValue={setEmail}
                    type={"email"}
                    required
                />
                <Center w={"full"} flexDir={'column'}>
                    {error && (
                        <Text color={"red"} fontSize={"sm"} as={"small"}>
                            {error}
                        </Text>
                    )}
                    <Button
                        variant={"secondary"}
                        type={"submit"}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                isIndeterminate
                                size={"6"}
                                color={"primary"}
                            />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </Center>
            </VStack>
        </>
    );
};

export default RegistrationForm;
