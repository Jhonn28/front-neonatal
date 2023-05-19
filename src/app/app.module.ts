import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { LibreriaModule } from '../../projects/libreria/src/lib/libreria.module';
import { environment } from 'environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor, LoadingInterceptor } from '../../projects/libreria/src/public-api';
import { NgProgressModule } from 'ngx-progressbar';
import { registerLocaleData } from '@angular/common';
import ca from '@angular/common/locales/ca';

import { HttpTokenInterceptor } from '../../projects/libreria/src/lib/interceptors/http-token.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(ca);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        LibreriaModule.forRoot(environment),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        // FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        // MarkdownModule.forRoot({}),
        NgProgressModule.withConfig({
            spinner: false,
            color: 'red'
        }),
        NgxSpinnerModule,
        ToastrModule.forRoot()
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
