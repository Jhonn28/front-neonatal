import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rulesPasswordResolver } from './resolvers/auth.resolvers';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {
    path: 'change-password'/*  resolve: {
      rules: rulesPasswordResolver,
    } */, loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
  },
  { path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'reset-password/:token', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
