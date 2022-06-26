import { atom } from "recoil";
import { UserData } from "../types";

export const userDataState = atom<UserData>({
    key: "userDataState",
    default: {
        id: "default",
        name: "default",
        age: 20,
        email: "default@example.com"
    }
});