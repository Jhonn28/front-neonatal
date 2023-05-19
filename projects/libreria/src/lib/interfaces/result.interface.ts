export interface IResultData {
    success: boolean;
    message: string;
    data?: any;
}

export interface IResultAuth {
    success: boolean;
    message: string;
    isChangePassword?: boolean;
    accessToken?: string;
    menu?: any;
    user?: any;
    accessDate?: any;
    uid: number;
}

export interface IResultError {
    success: boolean;
    message: string;
    error: any;
}
