import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Project } from './_model/Project';
import { ProjectService } from './_service/project.service';
import { User } from './_model/User';
import { AuthComponent } from "./auth/auth.component";
import { ProfileComponent } from "./profile/profile.component";
import { NewProjectComponent } from "./new-project/new-project.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule, AuthComponent, CommonModule, ProfileComponent, NewProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{

  //  user?: User = undefined;
   user?: User = {
    id:102,
    firstName:"test",
    lastName:"test",
    email:"test",
    balance:100
   };
  mode: boolean = true;

  constructor(private projectService: ProjectService){

  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.projects = []
    this.projectService.findAllProjects().subscribe(projects=>{
      projects.forEach(p=>{
        this.projects.push(p);
      })
    })
    
  }

  deleteProj(projId: number){
    this.projectService.deleteProject(projId, this.user?.id).subscribe(res=>{
      console.log(res)
      this.projects = []
      this.projectService.findAllProjects().subscribe(projects=>{
        projects.forEach(p=>{
          this.projects.push(p);
        })
      })
    })
  }

  videoUrl: string = '../assets/video.mp4'
  projects: Project[] = []


  logout(){
    this.user = undefined
  }
}
