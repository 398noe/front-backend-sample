import { atom } from "recoil";
import { UserData } from "../types";

export const userDataState = atom<UserData>({
    key: "userDataState",
    default: {
        id: "",
        name: "",
        age: 20,
        email: ""
    }
});