import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserInDto } from '../models/user-in-dto.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseURL = `${environment.apiUrl}/users`;
  userExists = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(loginCredentials: UserInDto): Observable<object> {
    return this.http
      .post(`${this.baseURL}/login`, loginCredentials)
      .pipe(catchError(this.handleError));
  }

  register(userInfo: User): Observable<object> {
    return this.http
      .post(this.baseURL, userInfo)
      .pipe(catchError(this.handleError));
  }

  setUser() {
    this.userExists.next(true);
  }

  clearUser() {
    this.userExists.next(false);
    localStorage.clear();
  }
  getLoggedInUser(): string {
    return localStorage.getItem("id");
  }

  isLoggedIn(): Observable<boolean> {
    return this.userExists.asObservable();
  }

  // error handling
  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error.message && typeof err.error.message === "string") {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
