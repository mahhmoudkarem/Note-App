import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly router = inject(Router)
  isLogin:WritableSignal<boolean> = signal(false);
  logout(){
    
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
