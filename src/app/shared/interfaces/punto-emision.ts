export interface IPointEmission {
    value:         number;
    label:         string;
    iselectronico: boolean;
    documento:     number;
    numero:        string;
    secuencial:    string;
}

export interface ICashier {
    value:          number;
    ide_gtemp:           number;
    vendedor:            string;
    ide_tecaj:           number;
    caja:                string;
    ide_cotdo:           number;
    ide_cxcdad:          number;
    detalle_cxcdad:      string;
    fecha_salida_conven: Date;
    secuencial:          string;
}