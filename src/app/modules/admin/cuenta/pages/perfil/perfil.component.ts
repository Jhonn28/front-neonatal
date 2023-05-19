import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserCore } from '../../../../../../../projects/libreria/src/lib/class/user-core';
import { Subject } from 'rxjs';
import { SystemService } from '../../../../../../../projects/libreria/src/lib/services/system.service';
import { AuthService } from '../../../../../../../projects/libreria/src/lib/services/auth.service';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';

@Component({
  selector: 'cuenta-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {


    accountForm!: FormGroup;
    imgTemp: any;
    user: UserCore;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
      private _formBuilder: FormBuilder,
      private _systemService: SystemService,
      private _authService: AuthService,
      private _utilService: UtilsService
    ) {
      this.user = _authService.usuario;
    }

    ngOnInit(): void {
      // Create the form
      this.accountForm = this._formBuilder.group({
        uid: [this.user.ide_segusu],
        profile: [this.user.nombre_segper, Validators.required],
        name: [this.user.nombre_segusu,[Validators.required, Validators.maxLength(100)]],
        username:[this.user.username_segusu, [Validators.required, Validators.maxLength(100)]],
        email: [this.user.correo_segusu,[Validators.required, Validators.email]],
        foto: [this.user.foto_segusu]
      });

      this.imgTemp = this.user.foto_segusu;
      this.accountForm.get('profile')?.disable();
      this.accountForm.get('name')?.disable();
      this.accountForm.get('username')?.disable();
    }

    onBasicUploadAuto(file: File, fileUpload) {
       //console.log(file, fileUpload);
      if (!file) {
        return this.imgTemp = null;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imgTemp = reader.result;
        fileUpload.clear();
      }
    }

    async updateProfile() {

        if(this.accountForm.get('name').value === this.user.nombre_segusu &&
        this.accountForm.get('username').value === this.user.username_segusu &&
        this.accountForm.get('email').value === this.user.correo_segusu) {
            this._utilService.addMessageInfo('No se han realizado cambios');
            return;
        }
       if (this.accountForm.invalid) {
           this._utilService.addWarningMessage('Verifique que los campos sean correctos y vuelva a intentar.');
        return;
      }
      // Disable the form
      this.accountForm.disable();

      const uid = this.accountForm.get('uid').value;
      const body = this.accountForm.value;
      body['foto'] = this.imgTemp;
      delete body.uid;
      delete body.profile;
      // Sign in
       await this._systemService.updateProfile(body, uid).subscribe(
        (res) => {
          this.user.correo_segusu = body.email;
          this.user.nombre_segusu = body.name;
          this.user.foto_segusu = body.foto;
          this._utilService.addMessageSuccess(res.message);
          this.accountForm.enable();
          this.accountForm.get('profile')?.disable();
          this.accountForm.get('name')?.disable();
          this.accountForm.get('username')?.disable();
        }, (err) => {
            this.accountForm.enable();
            this._utilService.addWarningMessage('Hubo un problema al actualizar los datos');
        });
    }

      isInvalidField(campo: string){
        return (this.accountForm.get(campo)?.invalid && this.accountForm.get(campo)?.touched);
      }
      getErrorMessage(campo: string){
        let message;
        if(this.accountForm.get(campo)?.hasError('required')){
          message = 'Este campo es obligatorio';
        }else if(this.accountForm.get(campo)?.hasError('minlength')){
          const minLength = this.accountForm.get(campo)?.errors?.minlength.requiredLength;
          message = `Debe ingresar mínimo ${minLength} caracteres`;
        }else if(this.accountForm.get(campo)?.hasError('maxlength')){
          const maxLength = this.accountForm.get(campo)?.errors?.maxlength.requiredLength;
          message = `El numero mayor de caracteres permitido es: ${maxLength} `;
        }
        return (message);
      }

}
