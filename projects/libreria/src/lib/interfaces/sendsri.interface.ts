export interface IResponseRecepcionSri {
    success?: boolean;
    result?: Result;
}

export interface Result {
    estado?: string;
    comprobantes?: Comprobantes;
}

export interface Comprobantes {
    comprobante?: Comprobante;
}

export interface Comprobante {
    claveAcceso?: string;
    mensajes?: Mensajes;
}

export interface Mensajes {
    mensaje?: Mensaje;
}

export interface Mensaje {
    identificador?: string;
    mensaje?: string;
    informacionAdicional?: string;
    tipo?: string;
}
