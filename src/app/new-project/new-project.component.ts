import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProjectService } from '../_service/project.service';
import { AddProjectRequest } from '../_model/AddProjectRequest';
import { AppComponent } from '../app.component';
import { ProjectcCategoryService } from '../_service/project-category.service';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {
  isClicked = false;
  @Input() authorId: number = 0;

  name: string = "";
  desc: string = "";
  target: number = 500;
  category: string = "Техника"
  categories = [
    "Техника",
    "Наука"
  ]

  constructor(private projectService: ProjectService, private appComp: AppComponent, private projectCategoryService: ProjectcCategoryService) {
    this.projectCategoryService.findAllCategories().subscribe(res => {
      this.categories = []
      res.forEach(r => this.categories.push(r.name))
    })

  }

  clickNewProj() {
    this.isClicked = !this.isClicked;
  }

  newProject() {
    var request: AddProjectRequest = {
      name: this.name,
      description: this.desc,
      authorId: this.authorId,
      target: this.target,
      category: this.category
    }
    this.projectService.addProject(request).subscribe(res => {
      console.log(res);
      this.appComp.projects = []
      this.projectService.findAllProjects().subscribe(projects => {
        projects.forEach(p => {
          this.appComp.projects.push(p);
        })
      })
    })
    this.isClicked = false;

  }
}
