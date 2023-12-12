import { ICookieProps } from "./ICookieProps";

export interface IRegisterFormProps extends ICookieProps {
    handleAlert?: (success: boolean) => void;
    setAlertMessage?: (message: string) => void;
}