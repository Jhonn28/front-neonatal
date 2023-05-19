import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { TreeNode } from 'primeng/api';

import { AuthService } from '../../../../../../../projects/libreria/src/public-api';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SeleccionarEmpresaComponent } from '../../components/seleccionar-empresa/seleccionar-empresa.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [DialogService]
})
export class LoginComponent implements OnInit {

    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    signInForm: FormGroup;

    changePassword: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _utilService: UtilsService,
        public dialogService: DialogService
    ) {
        _authService.getIpPublic();
    }

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            username: [, [Validators.required]],
            password: [, Validators.required],
            rememberMe: [false]
        });
    }
/*     username: ['1752252278', [Validators.required]],
    password: ['jguashpa', Validators.required],
 */
    /**
     * Iniciar sesión
     * @returns
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        const password: string = this.signInForm.get('password').value;

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe(
            (res) => {
              //console.log("respuesta=>",res)
                if (res.isChangePassword) {
                    this._authService.currentPassword = this.signInForm.get('password').value;
                    this._router.navigate(['/change-password'], { queryParams: { token: res.accessToken } });
                    return;
                }
                // verifico si tiene sucursales y empresa asignado
                this._authService.userCompany(1).subscribe((resp) => {
                  //console.log(resp);
                    if (!resp.data || resp.data.length==0) {
                      this.signInForm.enable();
                        this._utilService.addErrorMessage('El usuario no tiene asignado empresa, contactese con el administrador del sistema.');
                        return;
                    }
                    // abro el dialogo de sucursales
                    //console.log("DARTA=>",resp.data);
                    this.openDialog(resp.data);

                });
            }, (response) => {
              //console.log("response=>",response)
                // Re-enable the form
                //console.log("response=>",response)
                if(response.error.block){
                  this.signInForm.disable();

                }else{
                  this.signInForm.enable();
                  this.signInNgForm.resetForm();
                }


                // Reset the form
                // Set the alert
                this.alert = {
                    type: 'error',
                    message: response.error.message
                };

                // Show the alert
                this.showAlert = true;
            });
    }



    /**
     * Abrir dialogo de sucursales
     * @param branches satos de sucursales
     * @returns
     */
    openDialog(branches: TreeNode): void {
       /*  console.log(branches);

        console.log(branches[0].children.length,branches[0].children[0].children.length); */
        // verifico si el usuario tiene varios sucursales o solo uno
        if (branches[0].children.length === 1 && branches[0].children[0].children.length === 1) {
          //console.log('branches=>',branches[0]);
            this._authService.saveVariableCompany(branches[0].data, branches[0].children[0].data, branches[0].children[0].children[0].data);

            this._router.navigateByUrl('private');
            return;
        }
        const ref = this.dialogService.open(SeleccionarEmpresaComponent, {
            header: 'SELECCIONE A LA UNIDAD OPERATIVA A LA QUE DESEA ACCEDER',
            width: '90%',
            data: {
                data: branches
            },
            modal: true,
            closable: false,
            dismissableMask: false,
            contentStyle: {
                "padding-bottom": "60px"
            }
        });
        ref.onClose.subscribe((close) => {
            this.signInForm.enable();
            // Reset the form
            this.signInNgForm.resetForm();

        });
    }



}
