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
import { ProjectCategory } from './_model/ProjectCategory';
import { ProjectcCategoryService } from './_service/project-category.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule, AuthComponent, CommonModule, ProfileComponent, NewProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  //  user?: User = undefined;
  user?: User = undefined;
  mode: boolean = true;
  selectedProj?: number = undefined;
  showCommentBlock = false;
  showSupportBlock = false;
  showAddImageBlock = false;
  newCommentText: string = ""
  supportAmount = 0;
  imageToAdd?: File = undefined;

  onlyOwn: boolean = false;

  categories: ProjectCategory[] = []
  category: string = 'Все'

  constructor(private projectService: ProjectService, private userService: UserService, projectCategoryServ: ProjectcCategoryService) {
    projectCategoryServ.findAllCategories().subscribe(res => {
      this.categories = []
      res.forEach(c => {
        this.categories.push(c)
      })
    })
  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.userService.findById(102).subscribe(res => {
      this.user = res;
    })
    this.updateProjects(this.category);

    this.ownProjects.forEach(p => console.log(p))
  }

  deleteProj(projId: number) {
    this.projectService.deleteProject(projId, this.user?.id).subscribe(res => {
      console.log(res)
      this.updateProjects(this.category);
    })
  }

  closeProj(projId: number) {
    this.projectService.closeProject(projId, this.user?.id).subscribe(res => {
      console.log(res)
      this.updateProjects(this.category);
    })
  }


  videoUrl: string = '../assets/video.mp4'
  projects: Project[] = []
  ownProjects: Project[] = []


  logout() {
    this.user = undefined
  }

  clickComment(projId: number) {
    this.showSupportBlock = false;
    if (!this.showCommentBlock) {
      this.showCommentBlock = true;
      this.selectedProj = projId;
    } else {
      this.newCommentText = "";
      if (this.selectedProj == projId) {
        this.showCommentBlock = false;
        this.selectedProj = undefined;
      } else {
        this.showCommentBlock = true;
        this.selectedProj = projId;
      }
    }
  }

  createComment(text: string, projId: number, userId: number) {
    this.projectService.createComment(text, projId, userId)
      .subscribe(res => {
        console.log(res);
        this.showCommentBlock = false;
        this.selectedProj = undefined;
        this.newCommentText = ""

        this.updateProjects(this.category);
      });
  }

  clickSupport(projId: number) {
    this.showCommentBlock = false;
    if (this.showSupportBlock) {
      this.supportAmount = 0;
      if (this.selectedProj == projId) {
        this.showSupportBlock = false;
        this.selectedProj = undefined;
      } else {
        this.showSupportBlock = true;
        this.selectedProj = projId;
      }
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

      this.updateProjects(this.category);

      this.userService.findById(usrId).subscribe(response => {
        this.user = response;
      })
    }
    );
  }

  clickAddImage(projId: number) {
    this.showSupportBlock = false;
    this.showCommentBlock = false;
    if (this.showAddImageBlock) {
      this.showAddImageBlock = false;
      this.selectedProj = undefined;
    } else {
      this.showAddImageBlock = true;
      this.selectedProj = projId;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageToAdd = input.files[0]; // Получаем первый файл
      console.log('Selected file:', this.imageToAdd);
    } else {
      this.imageToAdd = undefined; // Если файл не выбран
    }
  }

  addImage(projId: number, imageInput: any) {
    const usrId = this.user ? this.user.id : 0;
    const image = this.imageToAdd ? this.imageToAdd : imageInput.files[0];
    this.projectService.addImage(projId, usrId, image).subscribe(res => {
      console.log(res)

      this.showSupportBlock = false;
      this.showCommentBlock = false;
      this.showAddImageBlock = false;
      this.selectedProj = undefined;

      this.updateProjects(this.category);
    })
  }

  deleteImage(projId: number, imageId: number) {
    const usrId = this.user ? this.user.id : 0;
    this.projectService.deleteImage(projId, imageId, usrId).subscribe(res => {
      console.log(res);

      this.showSupportBlock = false;
      this.showCommentBlock = false;
      this.showAddImageBlock = false;
      this.selectedProj = undefined;

      this.updateProjects(this.category);
    })
  }

  getProgressPercent(p: Project): number {
    return Math.round((p.collected / p.target) * 100);
  }

  getNormalizedProgress(p: Project): number {

    return Math.min(100, this.getProgressPercent(p));

  }

  getExcessPercent(p: Project): number {
    return Math.max(0, this.getProgressPercent(p) - 100);
  }

  updateProjects(category: string) {
    this.projects = []
    this.ownProjects = []
    this.projectService.findAllProjects().subscribe(projects => {
      projects.forEach(p => {
        if (!this.onlyOwn) {
          if (!p.closed) {
            if (this.category === "Все") {
              this.projects.push(p);
            } else {
              if (this.category === p.category.name) {
                this.projects.push(p);
              }
            }
          }
        }

        if (p.author.id == this.user?.id) {
          if (this.category === "Все") {
            this.ownProjects.push(p)
          }
          else {
            if (this.category === p.category.name) {
              this.ownProjects.push(p)
            }
          }

        }
      })
    })
    this.sortByCreatedAt();
  }

  sortBy: string = "createdAt"
  direction: string = "asc"

  sortByCreatedAt() {
    this.projects = this.projects.sort((p1, p2) => {
      if (p1.createdAt > p2.createdAt) {
        if (this.direction === "asc") {
          return 1;
        } else if (this.direction === "desc") {
          return -1;
        }
        return 0;
      } else {
        return -1;
      }
    });
    this.ownProjects = this.ownProjects.sort((p1, p2) => {
      if (p1.createdAt > p2.createdAt) {
        if (this.direction === "asc") {
          return 1;
        } else if (this.direction === "desc") {
          return -1;
        }
        return 0;
      } else {
        return -1;
      }
    });
  }

  categoryChanged() {
    this.updateProjects(this.category);
  }
}
