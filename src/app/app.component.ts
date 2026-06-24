import { HeaderBarComponent } from './core/components/header-bar.component';
import { NavComponent } from './core/components/nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderBarComponent, NavComponent],

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    var angularPlugin = new AngularPlugin();
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: { router: this.router },
        },
      },
    });
    appInsights.loadAppInsights();
  }
}
