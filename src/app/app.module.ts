import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, AboutComponent, declarations, ProductDetailsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppStoreModule,
    externalModules,
    NgxGoogleAnalyticsModule.forRoot('G-QNRSG74G3G')
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
