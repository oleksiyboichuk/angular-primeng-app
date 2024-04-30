import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../shared/models/user.model';

@Injectable({ providedIn: 'root' })

export class SetLoginService {
	private loginDataService = new BehaviorSubject<any>(null);
	loginData$ = this.loginDataService.asObservable();

	setLoginData(data: IUser) {
		this.loginDataService.next(data);
	}
}