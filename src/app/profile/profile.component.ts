import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from '../_model/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() profileUser?: User;
  show: boolean = false;
  appComp?: AppComponent = undefined;

  constructor(app: AppComponent) {
    this.appComp = app;
  }

  clickButtton() {
    this.show = !this.show;
  }

  logout() {
    if (this.appComp) {
      this.appComp.user = undefined;
    }
    this.profileUser = undefined;
  }
}
