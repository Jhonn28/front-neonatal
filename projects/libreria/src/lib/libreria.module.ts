import { NgModule, ModuleWithProviders } from '@angular/core';
import { LibreriaComponent } from './libreria_component';
// import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
LibreriaComponent

  ],
  imports: [
  ],
  providers: []
})
export class LibreriaModule {
  public static forRoot(environment: any): ModuleWithProviders<LibreriaModule> {
    return {
      ngModule: LibreriaModule,
      providers: [
        {
          provide: 'env',
          useValue: environment
        }
      ]
    };
  }
}
