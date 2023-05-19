import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService, IResultData, UtilsService } from '../../../../../../../projects/libreria/src/public-api';
import { SystemService } from '../../../../../../../projects/libreria/src/lib/services/system.service';
import { FuseValidators } from '@fuse/validators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [
  ]
})
export class ResetPasswordComponent implements OnInit {


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
  private token;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _authService: AuthService,
    private _systemService: SystemService,
  ) {

  }

  ngOnInit(): void {
    this.token = this._route.snapshot.paramMap.get('token');
/*      */

      if(this._utilService.decodeTokens(this.token)){
        if(!this._utilService.isExpiredToken(this.token)){
          this.isDraw=true;
        }
      }

    this.formInit();
  }

  formInit() {
    this.resetPasswordForm = this._formBuilder.group({
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
      newPassword: this.resetPasswordForm.get('password')?.value
    }

    // Sign in
    this._authService.resetPassword(this.token, body).subscribe(
      (res: IResultData) => {
        //console.log('res=û',res);
        //this._utilService.addMessageSuccess(res+' Vuelva a iniciar sesión con su nueva contraseña');
        this._utilService.addLoadingMessage(res.message +' Vuelva a iniciar sesión con su nueva contraseña en <b></b>','success',()=>{this.redirectLogin()},'Reseteo de contraseña');

        //this._router.navigateByUrl('login');
      }, (response) => {
        //this._utilService.addLoadingMessage(response+' Vuelva a iniciar sesión con su nueva contraseña en <b></b>','success',()=>{this.redirectLogin()});


        //console.log('response)>',response);
        // Re-enable the form
        this.resetPasswordForm.enable();

        // Reset the form
        this.resetPasswordNgForm.resetForm();
        // Set the alert

        // Show the alert
        //this.showAlert = true;
      });
  }

  redirectLogin(){
    this._router.navigateByUrl('private');
  }
}
