import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../_model/Project';
import { Observable } from 'rxjs';
import { AddProjectRequest } from '../_model/AddProjectRequest';
import { AddProjectResponse } from '../_model/AddProjectResponse';
import { CreateCommentRequest } from '../_model/CreateCommentRequest';
import { CreateCommentResponse } from '../_model/CreateCommentResponse';
import { SupportProjectResponse } from '../_model/SupportProjectResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  api: string = "http://localhost:8080/api/v1/projects"

  constructor(private httpClient: HttpClient) {
  }

  findAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.api, this.options);
  }

  addProject(request: AddProjectRequest): Observable<AddProjectResponse> {
    return this.httpClient.post<AddProjectResponse>(this.api, request, this.options);
  }

  deleteProject(projId: number, userId?: number): Observable<string> {
    var request = { projectId: projId }

    var apiUrl = this.api + '/' + projId;
    var usrId = userId ? userId : 0;
    const params: HttpParams = new HttpParams().set('userId', usrId);
    return this.httpClient.delete<string>(apiUrl, { params: params, headers: this.options.headers });
  }

  createComment(text: string, projId: number, userId: number): Observable<CreateCommentResponse> {
    var request: CreateCommentRequest = {
      userId: userId,
      text: text
    }
    const apiUrl = this.api + '/' + projId + '/comments'

    return this.httpClient.post<CreateCommentResponse>(apiUrl, request, this.options);
  }

  supportProject(projId: number, amount: number, userId: number): Observable<SupportProjectResponse> {
    const apiUrl = this.api + '/' + projId + '/support';
    const params: HttpParams = new HttpParams().set('userId', userId).set('amount', amount);

    return this.httpClient.post<SupportProjectResponse>(apiUrl, params);
  }

  addImage(projId: number, userId: number, image: File) {
    if (!image) {
      throw new Error('No file selected');
    }

    console.log('Image type:', image instanceof Blob); // Должно быть true
    console.log('Image:', image);

    const apiUrl = this.api + '/' + projId + '/images/upload/' + userId;
    const formData = new FormData();
    formData.append('file', image, image.name);

    // Логирование FormData
    for (const pair of (formData as any).entries()) {
      console.log(pair[0], pair[1]);
    }

    return this.httpClient.post<SupportProjectResponse>(apiUrl, formData);
  }

}
