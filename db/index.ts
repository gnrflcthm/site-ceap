import { connect } from "mongoose";

export * from "./models";

export const connectDB = async () => connect(process.env.DATABASE_URL || "");
