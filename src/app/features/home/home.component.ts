import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { SetLoginService } from '../../services/set-login.service';
import { IUser } from '../../shared/models/user.model';
import { HomeChartsComponent } from './components/home-charts/home-charts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    HomeChartsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userData: any;

  constructor(
    private router: Router,
    private setLoginService: SetLoginService
  ) { }

  ngOnInit(): void {
    this.setLoginService.loginData$.subscribe(data => {
      this.userData = data;
      console.log(data);
      if (data) this.userData = data;
      else this.router.navigate(['login']);
    })
  }


  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
