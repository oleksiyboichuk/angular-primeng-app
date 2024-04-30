import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ToastModule,
    // BrowserAnimationsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-primeng-app';
}
