import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  api: string = "http://localhost:8080/api/v1/users"


  constructor(private httpClient: HttpClient) {
  }

  findById(userId: number): Observable<User> {
    const apiUrl = this.api + '/' + userId;
    return this.httpClient.get<User>(apiUrl, this.options);
  }
}
