import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService, SystemService, UtilsService } from '../../../../../../../projects/libreria/src/public-api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [
  ]
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  resetPasswordForm: FormGroup;
  showAlert: boolean = false;

  isDraw = false;
  private _accesToken: string;
  private _tokendecode: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _authService: AuthService,
    private _systemService: SystemService
  ) {
    if (!_authService.currentPassword) {
      //console.log('No tengo contraseña actual')
      // this._router.navigate(['/login']);
      return
    }
    this._accesToken = this._route.snapshot.queryParams['token'];
    if (!this._accesToken) {
      // this._router.navigate(['/login']);
      return
    }
    try {
      this._tokendecode = this._utilService.decodeTokens(this._accesToken);
      this.isDraw = true;
    } catch (error) {
      // this._router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.formInit();
    this.resetPasswordForm.get('passwordCurrent')?.disable();
    this.resetPasswordForm.get('passwordCurrent')?.setValue(this._authService.currentPassword);
  }

  formInit() {
    this.resetPasswordForm = this._formBuilder.group({
      passwordCurrent: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    },
      {
        validators: FuseValidators.mustMatch('password', 'passwordConfirm')
      }
    );
  }

  resetPassword(): void {
    // Return if the form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }



    // Disable the form
    this.resetPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    const body = {
      nuevaPassword: this.resetPasswordForm.get('password')?.value,
      passwordActual: this.resetPasswordForm.get('passwordCurrent')?.value
    }

    // Sign in
    this._systemService.updatePassword(body, this._tokendecode.sub, this._accesToken).subscribe(
      (res) => {
        this._utilService.addMessageSuccess(res+' Vuelva a iniciar sesión con su nueva contraseña');
        this._router.navigateByUrl('login');
      }, (response) => {

        // Re-enable the form
        this.resetPasswordForm.enable();

        // Reset the form
        this.resetPasswordNgForm.resetForm();
        this.resetPasswordForm.get('passwordCurrent')?.disable();
        this.resetPasswordForm.get('passwordCurrent')?.setValue(this._authService.currentPassword);
        // Set the alert
        this.alert = {
          type: 'error',
          message: response.error.message
        };

        // Show the alert
        this.showAlert = true;
      });
  }

}
