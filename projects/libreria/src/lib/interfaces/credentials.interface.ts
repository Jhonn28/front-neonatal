export interface ICredencials {
    username: string;
    password: string;
    remember: boolean;
    ip?: string;
    device?: string;
    browser?: string;
    userAgent?: string;
}