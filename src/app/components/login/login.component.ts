import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login', // This defines the custom HTML tag for this component.
  templateUrl: './login.component.html', // This should point to your HTML template file.
  styleUrls: ['./login.component.css'] // Optional: This should point to your CSS file.
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      // Handle successful login, redirect, etc.
    } catch (error) {
      // Handle login error
    }
  }
}
