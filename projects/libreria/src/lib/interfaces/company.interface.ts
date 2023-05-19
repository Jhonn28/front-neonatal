export interface Multinacional {
    data:          number;
    label:         string;
    children:      Empresas[];
    expandedIcon:  string;
    collapsedIcon: string;
}

export interface Empresas {
    data:          number;
    label:         string;
    children:      Sucursales[];
    expandedIcon:  string;
    collapsedIcon: string;
}

export interface Sucursales {
    data:  number;
    icon:  string;
    label: string;
}