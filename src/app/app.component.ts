import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MsalService} from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'attendance_frontend';
  constructor(private msalService: MsalService) { }

  async ngOnInit() {
    try {
      await this.msalService.instance.initialize();
      await this.msalService.instance.handleRedirectPromise();
    } catch (error) {
      console.error('MSAL initialization error:', error);
    }
  }

}
