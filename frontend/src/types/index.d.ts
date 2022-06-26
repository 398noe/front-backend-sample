export interface UserData  {
    id?: string;
    name: string;
    age: number;
    email: string;
}

export interface Message {
    data: any;
    status: string;
    date: string;
}

export interface UserStatus {
    isLogin: boolean;
    isRegister: boolean;
}