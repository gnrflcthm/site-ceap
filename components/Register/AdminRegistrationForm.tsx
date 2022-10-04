import { FC, useState, FormEvent } from "react";

import { Button, CircularProgress, Heading, VStack } from "@chakra-ui/react";
import CoreSelect from "@components/CoreSelect";
import axios, { AxiosError } from "axios";
import CoreInput from "@components/CoreInput";

const AdminRegistrationForm: FC<{
    memberSchools: any[];
    setState: Function;
}> = ({ memberSchools, setState }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [memberSchool, setMemberSchool] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const register = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("/api/admin/register", {
                firstName,
                middleName,
                lastName,
                mobileNumber,
                email,
                memberSchoolId: memberSchool,
            })
            .then((res) => {
                console.log(`${res.status}: ${res.statusText}`);
                setState("success");
            })
            .catch((err: AxiosError) => {
                setError(err.response?.statusText);
                alert(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <VStack as={"form"} onSubmit={register} w={"full"} spacing={"8"}>
            <Heading fontSize={"2xl"} w={"full"} textAlign={"center"}>
                Admin Registration
            </Heading>
            <CoreInput
                name="lastName"
                setValue={setLastName}
                placeholder={"Last Name"}
                value={lastName}
                required
                disabled={loading}
            />
            <CoreInput
                name="firstName"
                setValue={setFirstName}
                placeholder={"First Name"}
                value={firstName}
                required
                disabled={loading}
            />
            <CoreInput
                name="middleName"
                setValue={setMiddleName}
                placeholder={"Middle Name"}
                value={middleName}
                required
                disabled={loading}
            />
            <CoreInput
                name="mobileNumber"
                setValue={setMobileNumber}
                placeholder={"Mobile Number"}
                value={mobileNumber}
                disabled={loading}
            />
            <CoreInput
                name="email"
                setValue={setEmail}
                placeholder={"Email Address"}
                value={email}
                required
                disabled={loading}
            />
            <CoreSelect
                name={"memberSchool"}
                // @ts-ignore
                options={memberSchools}
                placeholder={"School or Organization"}
                setValue={setMemberSchool}
                isGrouped
                required
                disabled={loading}
            />
            <Button type={"submit"} variant={"secondary"} disabled={loading}>
                {loading ? <CircularProgress size={8} /> : "Register"}
            </Button>
        </VStack>
    );
};

export default AdminRegistrationForm;