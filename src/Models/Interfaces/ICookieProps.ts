export interface ICookieProps{
    cookieUser?: any;
    setCookie: (name: "user", value: any) => void;
    removeCookie?: () => void;
}