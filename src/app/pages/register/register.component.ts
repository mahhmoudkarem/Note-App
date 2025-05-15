import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  errMsg:string = ''
  isLoading:boolean = false

  registerForm:FormGroup = new FormGroup({
    "name": new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    "email" : new FormControl(null , [Validators.required , Validators.email]),
    "password" : new FormControl(null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{4,}/)]),
    "age" : new FormControl(null , [Validators.required , Validators.min(16)]),
    "phone" : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0,9]{8}/)]),



  })


  userRegister(){
    this.isLoading = true
  
    
    
   
    
      this.userService.userSignin(this.registerForm.value).subscribe({
        next: res => {
          
          if (res.msg == 'done') {
            this.router.navigate(['/login'])
            this.registerForm.reset();
            this.isLoading = false
            
            
          }
          
        },
        error: err =>{
          console.log(err);
          
          this.errMsg = err.error.msg
          this.isLoading = false
          
        }
      })
    
      
    }
      
    

}