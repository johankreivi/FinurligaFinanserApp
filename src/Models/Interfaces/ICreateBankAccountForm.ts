export interface ICreateBankAccountFormProps {
    userName?: string;
    userId?: number;
    handleAlert: (success: boolean) => void;
    setAlertMessage: (message: string) => void;
    show: boolean;
    handleClose: () => void;
}