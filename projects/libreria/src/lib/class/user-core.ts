export class UserCore {

    constructor(
        public ide_segusu: number,
        public nombre_segusu: string,
        public username_segusu: string,
        public correo_segusu: string,
        public nombre_segper: string,
        public tema_segusu?: string,
        public foto_segusu?: string,
    ) { }

    /*get imagenUrl() {

        if (localStorage.getItem('avatar')) {
            this.img = localStorage.getItem('avatar');
        }

        if (!this.img) {
            return `${environment.API_REST}/api/uploads/getImagen/no-img.jpg`;
        } else if (this.img.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${environment.API_REST}/api/uploads/getImagen/${this.img}`;
        } else {
            return `${environment.API_REST}/api/uploads/getImagen/no-img.jpg`;
        }
    }*/
}