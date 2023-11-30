import { ResponseLoginUserDto } from "../Dto/ResponseLoginUserDto";

export interface IRegisterFormProps {
    handleAlert: (success: boolean) => void;
    setAlertMessage: (message: string) => void;
    setIsAuthorized: (ResponseLoginUserDto: ResponseLoginUserDto) => void;
    getIsAuthorized?: ResponseLoginUserDto;
}