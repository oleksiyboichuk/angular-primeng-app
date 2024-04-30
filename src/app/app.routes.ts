import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
	{
		path: 'login',
		loadComponent: () => import('./features/login/login.component')
			.then(c => c.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./features/register/register.component')
			.then(c => c.RegisterComponent)
	},
	{
		path: 'home',
		loadComponent: () => import('./features/home/home.component')
			.then(c => c.HomeComponent),
		canActivate: [authGuard]
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
];
