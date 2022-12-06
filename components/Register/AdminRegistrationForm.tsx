import { FC, useState, FormEvent, useMemo } from "react";

import {
    Button,
    Checkbox,
    CircularProgress,
    Heading,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import CoreSelect from "@components/CoreSelect";
import axios, { AxiosError } from "axios";
import CoreInput from "@components/CoreInput";
import { AnimatePresence } from "framer-motion";
import DPAModal from "@components/Modal/DPAModal";

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
    const [region, setRegion] = useState<string | undefined>(undefined);

    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);

    const regions = useMemo<{ name: string; value: string }[]>(() => {
        return memberSchools
            .map((ms) => ms.region)
            .filter((reg, i, arr) => arr.indexOf(reg) === i)
            .map((reg) => ({ name: reg, value: reg }));
    }, [memberSchools]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const register = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("/api/admin/register", {
                firstName: firstName.trim(),
                middleName: middleName.trim(),
                lastName: lastName.trim(),
                mobileNumber,
                email: email.trim(),
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
        <>
            <VStack as={"form"} onSubmit={register} w={"full"} spacing={"8"}>
                <Heading fontSize={"2xl"} w={"full"} textAlign={"center"}>
                    Member School Admin Registration
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
                    disabled={loading}
                />
                <CoreInput
                    name="mobileNumber"
                    setValue={setMobileNumber}
                    placeholder={"Mobile Number (+639xxxxxxxxx)"}
                    value={mobileNumber}
                    disabled={loading}
                    pattern={"^\\+63\\d{10}$"}
                />
                <CoreInput
                    name="email"
                    setValue={setEmail}
                    placeholder={"Email Address"}
                    value={email}
                    required
                    disabled={loading}
                />
                <CoreInput
                    type={"select"}
                    value={region}
                    setValue={setRegion}
                    name={"region"}
                    placeholder={"Region of your school"}
                    selectPrompt={"Select A Region"}
                    values={regions}
                />
                {region && (
                    <CoreSelect
                        name={"memberSchool"}
                        // @ts-ignore
                        options={memberSchools}
                        placeholder={"School or Organization"}
                        setValue={setMemberSchool}
                        isGrouped
                        required
                        disabled={loading}
                        filter={region}
                    />
                )}
                <Checkbox
                    w={"full"}
                    mt={"4"}
                    isChecked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    disabled={loading}
                >
                    By Registering, I agree to the{" "}
                    <Button
                        variant={"link"}
                        display={"inline"}
                        onClick={() => onOpen()}
                        disabled={loading}
                    >
                        Terms and Conditions
                    </Button>
                    .
                </Checkbox>
                <Button
                    type={"submit"}
                    variant={"secondary"}
                    disabled={loading || !termsAgreed}
                >
                    {loading ? <CircularProgress size={8} /> : "Register"}
                </Button>
            </VStack>
            <AnimatePresence>
                {isOpen && <DPAModal onDismiss={() => onClose()} />}
            </AnimatePresence>
        </>
    );
};

export default AdminRegistrationForm;
