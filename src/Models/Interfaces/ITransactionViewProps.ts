import { ICookieProps } from "./ICookieProps";

export interface ITransactionViewProps extends ICookieProps{    
    handleAlert?: (success: boolean) => void;
    setAlertMessage?: (message: string) => void;
}