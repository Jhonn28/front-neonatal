import { Condition } from "../interfaces";

export class ColumnCore {
    align?: 'left' | 'center' | 'right' | 'justify';
    comment: string;
    component?: 'text' | 'date' | 'time' | 'datetime' | 'check' | 'dropdown' | 'textarea' | 'icono' | 'avatar' | 'password' |
        'number' | 'decimals' | 'mask' | 'p12' | 'autocomplete' | 'imageAutocomplete' | 'radio' | 'label' | 'upload' | 'uid' | 'badge';
    configDropdown: any;
    decimals: number;
    defaultValue: any;
    expanded = false;
    help: string;
    filterText: string;
    length: number;
    listDropdown: any[];
    listRadio: any[];
    mask: string;
    name: string;
    nullDropdown = true;
    order: number;
    placeholder: string = '';
    read = false;
    resizable = true;
    required = false;
    sortable = true;
    type: string;
    unique = false;
    uppercase = false;
    visible = true;
    visualName: string;
    width: number;
    size = 'p-md-3';
    style: string;
    isRuc = false;
    isEmail = false;
    pathP12: string;
    files: Array<File> = [];

    // Eventos
    onMetodoChange?: (event?: any) => void;
    onClickBoton?: (event?: any) => void;
    setMetodoBlur?: (event?: any) => void;

    setWidth(length: number): void {
        if (length === null) {
            length = 10;
        }
        this.width = length;
    }

    setAlinerar(align: 'left' | 'center' | 'right' | 'justify'): void {
        this.align = align;
        /*  if (align == 'left') {
             this.style = 'text-align: left;'
         }
         if (align == 'center') {
             this.style = 'text-align: center;'
         }
         if (align == 'right') {
             this.style = 'text-align: right;'
         }
         if (align == 'justify') {
             this.style = 'text-align: justify;'
         } */
    }

    setFile(file: File) {
        this.files.push(file);
    }

    /**
     * La columna
     */
    setLabel(): void {
        this.read = true;
        this.component = 'label';
    }

    /**
     * Insignias redondas y cuadradas con texto.
     */
    setBadge(): void {
        this.component = 'badge';
        this.align = 'center';
    }

    setPassword(): void {
        this.component = 'password';
    }

    /**
     * Genera la columna en combo o lista despegable
     * @param nombreTabla nombre de la tabla
     * @param campoPrimario Campo primario o PK de la tabla
     * @param campoNombre Campos que se muestran en la lista o combo
     * @param condicion condiciónes para generar la lista
     */
    setDropdown(tableName: string, primaryField: string, nameField: string, condition?: Condition[]): void {
        this.listDropdown = [];
        this.configDropdown = {
            tableName,
            primaryField,
            nameField,
            condition
        };
        this.component = 'dropdown';
        this.setWidth(15);
    }

    setDropdownObject(object: any[]): void {
        this.listDropdown = [];
        object.unshift({ value: null, label: 'Seleccionar ...' });
        this.configDropdown = { object };
        this.component = 'dropdown';
        this.setWidth(15);
    }

    /**
     * Genera la columna en combo o lista despegable mediante un servicio rest o endpoint
     * @param service endpoint o servicio rest
     */
    setDropdownService(service: string, body?: any): void {
        this.listDropdown = [];
        this.configDropdown = {
            service,
            body,
        };
        this.component = 'dropdown';
        this.setWidth(15);
    }


    setAutocomplete(): void {
        if (this.component === 'dropdown') {
            this.component = 'autocomplete';
        }
        this.setWidth(15);
    }

    setIcono(): void {
        this.component = 'icono';
        this.setWidth(15);
    }


    setAvatar(): void {
        this.component = 'avatar';
        this.setWidth(6);
    }



    /**
     * Renombra la columna
     * @param nombre nombre nuevo de la columna
     */
    setVisualName(name: string): void {
        this.visualName = name.toUpperCase();
    }

    /**
     * Transforma el campo en fecha
     */
    setDate() {
        this.component = 'date'
    }

    /**
     * Convierte el campo en fecha y hora
     */
    setDateTime() {
        this.component = 'datetime';
    }

    /**
     * Permite ocultar o mostrar una columna
     * @param visible true o false
     */
    setVisible(visible: boolean): void {
        this.visible = visible;
    }

    /**
     * Permite poner el orden de la columna
     * @param orden número de orden
     */
    setOrder(order: number): void {
        this.order = order;
    }

    /**
     * Permite editar o bloquear el registro de la columna
     * @param lectura true o false
     */
    setRead(read: boolean): void {
        this.read = read;
    }

    setStyle(style: string) {
        this.style += style;
    }

    /**
     * Permite asignar un valor por defecto a la columna
     * @param valorDefecto valor por defecto
     */
    setDefaultValue(defaultValue: any): void {
        this.defaultValue = defaultValue;
    }

    /**
     * Permite asignar un comentario que le permita al usuario obtener ayuda mas detallada a que se refiere la columna
     * @param comentario comentario de ayuda
     */
    setComment(comment: string): void {
        this.comment = comment;
    }

    setHelp(help: string): void {
        this.help = help;
    }

    /**
     * Permite validar que el campo sea unico
     * @param unico true, false
     */
    setUnique(unique: boolean): void {
        this.unique = unique;
    }

    /**
     * Permite validar que el campo sea obligatorio
     * @param requerido true, false
     */
    setRequired(required: boolean): void {
        this.required = required;
    }


    setAutoCompleteJsonFile(url: string): void {
        this.listDropdown = [];
        this.configDropdown = { url };
        //this.component = 'dropdown';
        this.component = 'imageAutocomplete';
        this.setWidth(15);
        /* if (this.component === 'dropdown') {
        } */
    }

    setPlaceholder(placeholder: string): void {
        this.placeholder = placeholder;
    }

    setMask(mask: string): void {
        this.component = 'mask';
        this.mask = mask;
        this.placeholder = mask;
    }

    // getters and setters
    get isDropdown(): boolean {
        if (this.configDropdown) {
            return true;
        }
        return false;
    }

    /**
     * Asigna el tamaño de la columna o campo del formulario
     * @param numero número entero del 1 al 12
     */
    setSize(numero: number): void {
        const data = '';
        if (numero > 0 && numero <= 12) {
            this.size = `p-md-${numero}`;
        } else {
            this.size = 'p-md-6';
        }
    }

    setUpload() {
        this.component = 'upload';
        // this.o = false;
        if (this.read) {
            this.width = 10;
        }
        else {
            this.width = 20;
        }
    }

    /**
     * Permite subir una archivo .p12
     * @param path Ruta donde se va gurdar el archivo p12
     */
    setUploadFileP12(path: string) {
        this.component = 'p12';
        this.pathP12 = path;
        // this.o = false;
        if (this.read) {
            this.width = 10;
        }
        else {
            this.width = 20;
        }
    }

    /**
     * Permite validar este campo que ingresen el número de ruc corectamente
     */
    setIsRuc() {
        this.isRuc = true;
    }

    /**
     * Permite validar que ingrese un correo válido
     */
    setIsEmail() {
        this.isEmail = true;
    }

    setCleanFiles() {
        this.files = [];
    }

    getFile(): File[] {
        return this.files;
    }
}
