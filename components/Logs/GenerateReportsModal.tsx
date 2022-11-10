import { FC, useState, FormEvent } from "react";

import {
    Button,
    CircularProgress,
    Flex,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import CoreInput from "@components/CoreInput";
import Modal from "@components/Modal/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import Overlay from "@components/Modal/Overlay";
import axios, { AxiosError } from "axios";

const GenerateReportsModal: FC<{ onDismiss: Function }> = ({ onDismiss }) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    const generateReport = (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        if (startDate) {
            const start = new Date(startDate);
            const end = endDate ? new Date(endDate) : new Date();

            if (start > new Date()) {
                setError("Start Date cannot be set in the future");
                setLoading(false);
                return;
            }

            if (end > new Date()) {
                setError("End Date cannot be set in the future.");
                setLoading(false);
                return;
            }

            if (start > end) {
                setError("Start Date cannot be set ahead of End Date.");
                setLoading(false);
                return;
            }

            axios
                .post(
                    "/api/admin/report",
                    { start, end },
                    { responseType: "blob" }
                )
                .then((res) => {
                    const href = URL.createObjectURL(res.data);
                    const link = document.createElement("a");
                    link.href = href;
                    link.setAttribute("download", res.statusText);
                    link.click();
                    onDismiss();
                    toast({
                        title: "Generated Reports Successfully",
                        status: "success",
                    });
                })
                .catch((err: AxiosError) => {
                    setError(
                        err.response?.statusText ||
                            "Error in Generating Report."
                    );
                    setLoading(false);
                });
        }
    };

    return (
        <Overlay>
            <Modal>
                <ModalHeader
                    title={"Generate Reports"}
                    onDismiss={() => onDismiss()}
                />
                <VStack
                    as={"form"}
                    spacing={"8"}
                    p={"8"}
                    id={"reportForm"}
                    onSubmit={generateReport}
                    onFocus={() => setError("")}
                >
                    <CoreInput
                        type={"date"}
                        value={startDate}
                        setValue={setStartDate}
                        placeholder={"Start Date"}
                        name={"startDate"}
                        disabled={loading}
                        required
                    />
                    <CoreInput
                        type={"date"}
                        value={endDate}
                        setValue={setEndDate}
                        placeholder={"End Date"}
                        name={"endDate"}
                        disabled={loading}
                    />
                    {error && (
                        <Text
                            as={"small"}
                            color={"red"}
                            fontSize={"md"}
                            w={"full"}
                            textAlign={"center"}
                        >
                            {error}
                        </Text>
                    )}
                </VStack>

                <Flex p={"4"} bg={"secondary"} justify={"flex-end"}>
                    <Button
                        w={"fit-content"}
                        type={"submit"}
                        form={"reportForm"}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <CircularProgress
                                    isIndeterminate
                                    size={6}
                                    mr={"2"}
                                />
                                Generating Report
                            </>
                        ) : (
                            "Generate Report"
                        )}
                    </Button>
                </Flex>
            </Modal>
        </Overlay>
    );
};

export default GenerateReportsModal;
