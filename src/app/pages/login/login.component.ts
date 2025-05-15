import { UserService } from './../../core/services/user/user.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  errMsg:boolean = false
  isLoading:boolean = false

  loginForm:FormGroup = new FormGroup({
    "email" : new FormControl(null , [Validators.required]),
    "password" : new FormControl(null , [Validators.required])
  })


  userLogin(){
    this.isLoading = true
    this.userService.userLogin(this.loginForm.value).subscribe({
      next:res=>{
        if (res.msg == 'done') {
          localStorage.setItem('token' , res.token);
          this.loginForm.reset();
          this.router.navigate(['home'])
          this.isLoading = false
          
        }
        
      },
      error:err=>{
        this.errMsg = true;
        this.isLoading = false
        console.log(err);
        
      }
    })
    
  }

}
