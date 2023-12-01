export interface ICreateBankAccountFormProps {
    cookieUser?: any;
    handleAlert: (success: boolean) => void;
    setAlertMessage: (message: string) => void;
    show: boolean;
    handleClose: () => void;
}