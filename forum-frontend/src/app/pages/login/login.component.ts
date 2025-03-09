import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/topics']);
      },
      error: err => {
        if (err.status === 401) {
          this.errorMessage = err.error.message || 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      }
    });
  }
}
