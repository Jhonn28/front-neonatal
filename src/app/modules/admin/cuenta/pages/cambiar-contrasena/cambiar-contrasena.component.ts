import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../../projects/libreria/src/lib/services/auth.service';
import { UtilsService } from '../../../../../../../projects/libreria/src/lib/services/utils.service';
import { SecurityService } from '../../../../../../../projects/libreria/src/lib/services/security.service';
import { FuseValidators } from '@fuse/validators';
import { finalize } from 'rxjs/operators';
import { CuentaService } from '../../cuenta.service';
import { IPassword } from '../../../../../../../projects/libreria/src/lib/interfaces/user.interface';
@Component({
  selector: 'cu-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styles: [
  ]
})
export class CambiarContrasenaComponent implements OnInit {

  @ViewChild('securityFormNgForm') resetPasswordNgForm: NgForm;

  securityForm: FormGroup;
  rules: any;
  rules_value: any;
  password;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _utilService: UtilsService,
    private _securityService: SecurityService,
    private _cuentaService: CuentaService,
    private _router: Router
  ) {
    // Create the form
    this.securityForm = this._formBuilder.group({
      passwordActual: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required]
    },
      {
        validators: FuseValidators.mustMatch('nuevaPassword', 'passwordConfirm')
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._securityService.getRules().subscribe(res => {
      this.rules = res.rules;
      this.rules_value = res.data;
    });
  }

  async changePassword() {

    const newPassword = this.securityForm.get('nuevaPassword').value;
    if (newPassword.length < 8 || newPassword.length>16) {
      this._utilService.toast_warning("Verifique la longitud de la contraseña.");
      return;
    }
    if (!(newPassword.match(/[a-z]/) && newPassword.match(/[A-Z]/))) {
      this._utilService.toast_warning('Verifique que la contraseña cuente minúsculas y mayúsculas.')
      return;
    }

    if (!(newPassword.match(/\d/))) {
      this._utilService.toast_warning('Verifique que la contraseña cuente con caracteres numéricos.')
      return;
     }

    if (!(newPassword.match(/[^a-zA-Z\d]/))) {
    this._utilService.toast_warning('Verifique que la contraseña cuente con caracteres especiales.')
    return;
    }


    if (this.securityForm.invalid) {
      this._utilService.addWarningMessage('Verifique que los campos sean correctos y vuelva a intentar.');
      return;
    } 

    // Disable the form
    this.securityForm.disable();
    const body = this.securityForm.value;
    delete body.passwordConfirm;

    (await this._cuentaService.changePassword(body, this._utilService.getUserUid())).subscribe(async (res) => {
      this.resetPasswordNgForm.resetForm();
      this.securityForm.enable();
      await this._utilService.confirmationAlert(`${res.message}. Por su seguridad ¿Desea cerrar sesión?.`,
        () => this._authService.signOut().pipe(finalize(() => { this._router.navigate(['/login']); }),).subscribe(res => console.log(res)));
    }, (response) => {
      this.securityForm.enable();
      this._utilService.addWarningMessage(response.error.error);
    });

  }
  getErrorMessage(campo: string, campo2?: string) {
    let message;
    if (this.securityForm.get(campo)?.hasError('required')) {
      message = 'Este campo es obligatorio';
    } else if (this.securityForm.get(campo)?.hasError('minlength')) {
      const minLength = this.securityForm.get(campo)?.errors?.minlength.requiredLength;
      message = `Debe ingresar mínimo ${minLength} caracteres`;
    } else if (this.securityForm.get(campo)?.hasError('maxlength')) {
      const maxLength = this.securityForm.get(campo)?.errors?.maxlength.requiredLength;
      message = `El numero mayor de caracteres permitido es: ${maxLength} `;
    } if (this.securityForm.get(campo) != this.securityForm.get(campo2) && this.securityForm.get(campo2)) {
      message = "Las contraseñas no coinciden";
    }
    return (message);
  }
  ifEqualsPassword(nuevaPassword: string, confirmPassword: string) {
    return ((this.securityForm.get(nuevaPassword).value != this.securityForm.get(confirmPassword).value) && this.securityForm.get(nuevaPassword)?.touched && this.securityForm.get(confirmPassword)?.touched);
  }
  isInvalidField(campo: string) {
    return (this.securityForm.get(campo)?.invalid && this.securityForm.get(campo)?.touched);
  }

}
