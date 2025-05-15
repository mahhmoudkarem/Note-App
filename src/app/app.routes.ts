import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { notAuthGuard } from './core/guards/notAuth/not-auth.guard';

export const routes: Routes = [
    {path:'' , redirectTo:'home' ,pathMatch:"full"},
    {path:'home' , component:HomeComponent , title:'Home' ,canActivate:[authGuard]},
    {path:'login' , component:LoginComponent , title:'Login' },
    {path:'register' , component:RegisterComponent , title:'Regiter' },
    {path:'**' , component:NotfoundComponent , title:'NotFound'}
];
