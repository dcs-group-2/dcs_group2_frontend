import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import { AppInsightsMonitoringService } from './core/services/logging.service';
import {AuthenticationResult} from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'attendance_frontend';
  constructor(private msalService: MsalService, private monitoringService: AppInsightsMonitoringService) { }

  async ngOnInit() {
    try {
      this.msalService.instance.handleRedirectPromise().then((response: AuthenticationResult | null) => {
        if (response !== null && response.account) {
          this.msalService.instance.setActiveAccount(response.account);
          console.log('Login successful:', response);
        }
      }).catch(error => {
        console.error('MSAL authentication error:', error);
      });
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
  }

}
