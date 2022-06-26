import { Message, UserData } from "../../../types/index";

export type Methods = {
    post: {
        reqBody: UserData

        resBody: Message & {
            data: UserData
        }
    }
}