import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserRequest } from '../_model/RegisterUserRequest';
import { RegisterUserResponse } from '../_model/RegisterUserResponse';
import { LoginUserRequest } from '../_model/LoginUserRequest';
import { LoginResponse } from '../_model/LoginResponse';
import { User } from '../_model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  api: string = "http://localhost:8080/api/v1/auth"

  constructor(private httpClient: HttpClient) { }

  register(request: RegisterUserRequest): Observable<RegisterUserResponse> {
    const apiString = this.api + '/register'
    return this.httpClient.post<RegisterUserResponse>(apiString, request, this.options);
  }

  login(request: LoginUserRequest): Observable<User> {
    const apiString = this.api + '/login'
    return this.httpClient.post<User>(apiString, request, this.options);
  }
}
