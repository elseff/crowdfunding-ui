import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserRequest } from '../_model/RegisterUserRequest';
import { RegisterUserResponse } from '../_model/RegisterUserResponse';
import { LoginUserRequest } from '../_model/LoginUserRequest';
import { LoginResponse } from '../_model/LoginResponse';
import { User } from '../_model/User';
import { ProjectCategory } from '../_model/ProjectCategory';

@Injectable({
    providedIn: 'root'
})
export class ProjectcCategoryService {
    private options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    api: string = "http://localhost:8080/api/v1/categories"

    constructor(private httpClient: HttpClient) { }


    findAllCategories(): Observable<ProjectCategory[]> {
        return this.httpClient.get<ProjectCategory[]>(this.api, this.options);
    }
}
