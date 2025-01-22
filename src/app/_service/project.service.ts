import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_model/Project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};
api: string = "http://localhost:8080/api/v1/projects"

constructor(private httpClient: HttpClient){
}

  findAllProjects(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.api, this.options);
  }
}
