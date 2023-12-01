export interface IHeaderProps {
    userName: string;
    balance: number;
    handleShowModal: () => void;
    cookieUser?: any;
    setCookie: (name: "user", value: any) => void
    removeCookie?: () => void;
}