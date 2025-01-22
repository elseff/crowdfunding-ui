import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { RegisterUserRequest } from '../_model/RegisterUserRequest';
import { LoginUserRequest } from '../_model/LoginUserRequest';
import { AppComponent } from '../app.component';
import e from 'express';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isRegister: boolean = true;
  userForRegister: RegisterUserRequest = {
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }
  userForLogin: LoginUserRequest = {
    email:"",
    password:""
  }

constructor(private authService: AuthService, private app: AppComponent){

}

  onRegister():void{
      this.authService.register(this.userForRegister).subscribe(response=>{
        console.log(response)
        this.userForRegister = {
          firstName:"",
          lastName:"",
          email:"",
          password:""
        }
        this.app.user = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          balance: response.balance
        }
      })
  }

  onLogin(): void {
    this.authService.login(this.userForLogin).subscribe(response=>{
      console.log(response)
      this.userForLogin = {
        email:"",
        password:""
      }
      this.app.user =  response;
  })
  }

}
