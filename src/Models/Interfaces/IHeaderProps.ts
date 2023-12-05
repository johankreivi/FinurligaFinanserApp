import { UserDetails } from "../Dto/UserDetails";

export interface IHeaderProps {
    fullName: UserDetails;
    userName: string;
    balance: number;
    handleShowModal: () => void;
    cookieUser?: any;
    setCookie: (name: "user", value: any) => void
    removeCookie?: () => void;
}