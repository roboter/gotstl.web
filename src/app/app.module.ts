import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './router';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/store.module';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { externalModules } from './build-specific';
import { declarations } from './core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { FormsModule } from '@angular/forms';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';


@NgModule({
  declarations: [AppComponent, AboutComponent, declarations, ProductDetailsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppStoreModule,
    externalModules,
    FormsModule,
    NgxGoogleAnalyticsModule.forRoot('G-QNRSG74G3G'),
    
  ],
  bootstrap: [AppComponent],
  providers:[    
    { provide: ErrorHandler, useClass: ApplicationinsightsAngularpluginErrorService }
  ]
  
})
export class AppModule {}
