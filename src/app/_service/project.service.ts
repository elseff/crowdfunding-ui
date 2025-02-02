import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_model/Project';
import { Observable } from 'rxjs';
import { AddProjectRequest } from '../_model/AddProjectRequest';
import { AddProjectResponse } from '../_model/AddProjectResponse';

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

  addProject(request: AddProjectRequest): Observable<AddProjectResponse> {
    return this.httpClient.post<AddProjectResponse>(this.api, request, this.options);
  }

  deleteProject(projId: number, userId?: number): Observable<string>{
    var request = {projectId: projId}
    
    var apiUrl = this.api + '/' + projId;
    var usrId = userId ? userId : 0;
    const params: HttpParams = new HttpParams().set('userId', usrId);
    return this.httpClient.delete<string>(apiUrl, {params: params, headers: this.options.headers});
  }
}
