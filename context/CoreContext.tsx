import { createContext } from "react";

const COREContext = createContext<[string | null, Function | null]>([null, null]);

export {COREContext};