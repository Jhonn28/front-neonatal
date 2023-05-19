export interface IResponseAutorizacionSri {
  success?: boolean;
  result?:  Result;
}

export interface Result {
  claveAccesoConsultada?: string;
  numeroComprobantes?:    string;
  autorizaciones?:        Autorizaciones;
}

export interface Autorizaciones {
  autorizacion?: Autorizacion;
}

export interface Autorizacion {
  estado?:             string;
  numeroAutorizacion?: string;
  fechaAutorizacion?:  Date;
  ambiente?:           string;
  comprobante?:        string;
  mensajes?:           Mensajes;
}

export interface Mensajes {
  mensaje?: Mensaje;
}

export interface Mensaje {
  identificador?: string;
  mensaje?:       string;
}
