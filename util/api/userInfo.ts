import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

import { User, MemberSchool } from "@prisma/client";

export const getUserInfo: QueryFunction<User & {memberSchool: MemberSchool}> = async () => {
    return (await axios.get<User & {memberSchool: MemberSchool}>("/api/user/profile")).data;
};
