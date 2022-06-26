import md5 from "md5";

export const calcMD5 = (message: string): string => {
    return md5(message);
}