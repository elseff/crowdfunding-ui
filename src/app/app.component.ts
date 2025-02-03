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
import { UserService } from './_service/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule, AuthComponent, CommonModule, ProfileComponent, NewProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  //  user?: User = undefined;
  user?: User = {
    id: 102,
    firstName: "test",
    lastName: "test",
    email: "test",
    balance: 100
  };
  mode: boolean = true;
  selectedProj?: number = undefined;
  showCommentBlock = false;
  showSupportBlock = false;
  newCommentText: string = ""
  supportAmount = 0;

  constructor(private projectService: ProjectService, private userService: UserService) {

  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.projects = []
    this.projectService.findAllProjects().subscribe(projects => {
      projects.forEach(p => {
        this.projects.push(p);
      })
    })
    this.userService.findById(102).subscribe(res => {
      this.user = res
    })

  }

  deleteProj(projId: number) {
    this.projectService.deleteProject(projId, this.user?.id).subscribe(res => {
      console.log(res)
      this.projects = []
      this.projectService.findAllProjects().subscribe(projects => {
        projects.forEach(p => {
          this.projects.push(p);
        })
      })
    })
  }

  videoUrl: string = '../assets/video.mp4'
  projects: Project[] = []


  logout() {
    this.user = undefined
  }

  clickComment(projId: number) {
    this.showSupportBlock = false;
    if (!this.showCommentBlock) {
      this.showCommentBlock = true;
      this.selectedProj = projId;
    } else {
      this.showCommentBlock = false;
      this.selectedProj = undefined;
    }
  }

  createComment(text: string, projId: number, userId: number) {
    this.projectService.createComment(text, projId, userId)
      .subscribe(res => {
        console.log(res);
        this.showCommentBlock = false;
        this.selectedProj = undefined;
        this.newCommentText = ""

        this.projects = []
        this.projectService.findAllProjects().subscribe(projects => {
          projects.forEach(p => {
            this.projects.push(p);
          })
        })
      });
  }

  clickSupport(projId: number) {
    this.showCommentBlock = false;
    if (this.showSupportBlock) {
      this.showSupportBlock = false;
      this.selectedProj = undefined;
    } else {
      this.showSupportBlock = true;
      this.selectedProj = projId;
    }
  }

  supportProject(projId: number) {
    const usrId = this.user ? this.user?.id : 0
    this.projectService.supportProject(projId, this.supportAmount, usrId).subscribe(res => {
      console.log(res)
      this.supportAmount = 0;
      this.showSupportBlock = false;
      this.showCommentBlock = false;
      this.selectedProj = undefined;

      this.projects = []
      this.projectService.findAllProjects().subscribe(projects => {
        projects.forEach(p => {
          this.projects.push(p);
        })
      })

      this.userService.findById(usrId).subscribe(response => {
        this.user = response;
      })
    }
    );
  }
}
