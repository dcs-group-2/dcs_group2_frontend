import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import { AppInsightsMonitoringService } from './core/services/logging.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Attendance Registration';
  constructor(private msalService: MsalService, private monitoringService: AppInsightsMonitoringService) { }

  async ngOnInit() {
    try {
      await this.msalService.instance.handleRedirectPromise();
      await this.msalService.instance.initialize();
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
  }

}
