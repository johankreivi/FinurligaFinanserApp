export type ResponseLoginUserDto = {
    isAuthorized: boolean;
    id?: number
    userName?: string;
    message?: string;
};