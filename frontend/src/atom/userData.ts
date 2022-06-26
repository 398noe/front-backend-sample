import { atom } from "recoil";
import { UserData, UserStatus } from "../types";

export const userDataState = atom<UserData>({
    key: "userDataState",
    default: {
        id: "",
        name: "",
        age: 20,
        email: ""
    }
});


export const userStatusState = atom<UserStatus>({
    key: "userStatusState",
    default: {
        isLogin: false,
        isRegister: false
    } 
});