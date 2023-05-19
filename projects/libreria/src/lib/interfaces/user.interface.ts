export interface IUser {
    ide_segusu: number;
    ide_segper: number;
    nombre_segusu: string;
    correo_segusu: string;
    foto_segusu: null;
    nombre_segper: string;
}

export interface IPassword {
    nuevaPassword: string;
    passwordActual: string;
}