import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
    selector: 'auth-seleccionar-empresa',
    templateUrl: './seleccionar-empresa.component.html'
})
export class SeleccionarEmpresaComponent implements OnInit {

    company: TreeNode;
    selectedFile: TreeNode;
    loadingCancel = false;
    loadingAcept = false;

    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private _router: Router,
        private _utilService: UtilsService,
        private _authService: AuthService) {
        this.company = config.data.data;
    }

    ngOnInit(): void {
        this.selectedFile = this.company[0];
        this.selectedFile.expanded = true;
        this.selectedFile.children[0].expanded = true;
    }

    /**
     * Metodo boton acceptar del dialogo
     * @returns 
     */
    acceptDialog(): void {
        this.loadingAcept = true;
        if (!this.selectedFile.data || !this.selectedFile.parent || !this.selectedFile.parent.parent) {
            this._utilService.addWarningMessage('Seleccione una centro para continuar.');
            this.loadingAcept = false;
            return;
        }
        
        // console.log('sucursal: ', this.selectedFile.data, ' empresa: ', this.selectedFile.parent.data, ' multinacional:', this.selectedFile.parent.parent.data);
        this._authService.saveVariableCompany(this.selectedFile.parent.parent.data, this.selectedFile.parent.data, this.selectedFile.data);
        this._router.navigateByUrl('private');
        this.ref.close(true);
    }


    /**
     * Metodo boton cancelar del dialogo
     */
    closeDialog(): void {
        this.loadingCancel = true;
        this._authService.signOut().subscribe(res => {
            this.loadingCancel = false;
            this.ref.close(false);
        }, error => {
            this.ref.close(false);
        })
    }


}
