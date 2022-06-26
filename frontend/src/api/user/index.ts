import { Message, UserData } from '../../types';

export type Methods = {
    get: {
        query: {
            id: string
        }

        resBody: Message & {
            data: UserData
        }
    },
    post: {
        reqBody: UserData

        resBody: Message & {
            data: UserData
        }        
    },
    delete: {
        reqBody: {
            id: string
        }

        resBody: Message & {
            data: string
        }                
    }
}