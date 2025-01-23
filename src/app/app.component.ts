import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Project } from './_model/Project';
import { ProjectService } from './_service/project.service';
import { User } from './_model/User';
import { AuthComponent } from "./auth/auth.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule, AuthComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{

  user?: User = undefined;
  mode: boolean = true;

  constructor(private projectService: ProjectService){

  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.projectService.findAllProjects().subscribe(projects=>{
      projects.forEach(p=>{
        this.projects.push(p);
      })
    })
    
  }

  videoUrl: string = '../assets/video.mp4'
  projects: Project[] = []


}
