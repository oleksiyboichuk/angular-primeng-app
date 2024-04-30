import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { passwordMatchValidator } from '../../shared/validators/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../shared/models/user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get fullName() { return this.registerForm.controls['fullName'] };
  get email() { return this.registerForm.controls['email'] };
  get password() { return this.registerForm.controls['password'] };
  get confirmPassword() { return this.registerForm.controls['confirmPassword'] };

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as IUser).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully!' });
        this.router.navigate(['login']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong...' })
      }

    )


  }
}
