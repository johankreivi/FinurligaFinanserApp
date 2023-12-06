import { ResponseLoginUserDto } from "../Dto/ResponseLoginUserDto";


export interface IRegisterFormProps {
    handleAlert: (success: boolean) => void;
    setAlertMessage: (message: string) => void;
    cookieUser?: any;
    setCookie: (name: "user", value: any) => void
    removeCookie?: () => void;
}