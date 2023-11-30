export type ResponseLoginUserDto = {
    isAuthorized: boolean;
    userId?: number
    userName?: string;
    message?: string;
};