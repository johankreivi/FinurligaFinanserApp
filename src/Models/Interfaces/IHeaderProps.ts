import { UserDetails } from "../Dto/UserDetails";
import { ICookieProps } from "./ICookieProps";

export interface IHeaderProps extends ICookieProps {
    userDetails: UserDetails;
}