import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { SetLoginService } from '../../services/set-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private setLoginService: SetLoginService
  ) { }

  get email() { return this.loginForm.controls['email'] };
  get password() { return this.loginForm.controls['password'] };

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          //set data to the stream
          this.setLoginService.setLoginData(response[0]);
          // console.log(response[0]);

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully!' })
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['home'])
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong!' });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong...' });
      }
    )
  }
}
