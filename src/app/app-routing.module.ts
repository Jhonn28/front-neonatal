import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
   {
    path: 'common',
    loadChildren: () => import('./modules/common/common.module').then(m => m.CommonModule)
  },
  {
    path: '**',
    redirectTo: 'common/not-found',
    data: {
      type: 'general'
    }
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerConfig),
    // AdminRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
