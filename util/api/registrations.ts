import { UserRegistration, MSAdminRegistration, MemberSchool } from "@prisma/client";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getRegistrations: QueryFunction<
    UserRegistration[] | (MSAdminRegistration & { memberSchool: MemberSchool })[] | undefined
> = async () => {
    return (
        await axios.post<{
            registrations: UserRegistration[] |(MSAdminRegistration & { memberSchool: MemberSchool })[] | undefined;
        }>("/api/member/registrations", {})
    ).data.registrations;
};
