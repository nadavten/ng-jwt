import { AuthService } from '../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  //selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService:AuthService) { }

  logout(){
    this.authService.logout();
  }
}