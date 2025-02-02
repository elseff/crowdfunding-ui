import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../_service/project.service';
import { AddProjectRequest } from '../_model/AddProjectRequest';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {
  isClicked = false;
  @Input() authorId: number=0; 

  name: string = "";
  desc: string = "";

  constructor(private projectService: ProjectService, private appComp: AppComponent){

  }

  clickNewProj(){
    this.isClicked = !this.isClicked;
  }

  newProject() {
    var request: AddProjectRequest = {
      name: this.name,
      description: this.desc,
      authorId: this.authorId
    }
    this.projectService.addProject(request).subscribe(res=>{
      console.log(res);
      this.appComp.projects = []
      this.projectService.findAllProjects().subscribe(projects=>{
        projects.forEach(p=>{
          this.appComp.projects.push(p);
        })
      })
    })
    this.isClicked = false;
    
  }
}
