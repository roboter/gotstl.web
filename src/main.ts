import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



import { environment } from './environments/environment';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/router';
import { AppStoreModule } from './app/store/store.module';
import { externalModules } from './app/build-specific';
import { FormsModule } from '@angular/forms';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppStoreModule, externalModules, FormsModule, NgxGoogleAnalyticsModule.forRoot('G-QNRSG74G3G')),
        provideHttpClient(),
        { provide: ErrorHandler, useClass: ApplicationinsightsAngularpluginErrorService },
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
