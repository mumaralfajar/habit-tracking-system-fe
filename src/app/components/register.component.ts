import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Create Account</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="auth-form" (ngSubmit)="onSubmit()" [class.loading]="isLoading">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" name="email" type="email" required>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [(ngModel)]="password" name="password" type="password" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirm Password</mat-label>
              <input matInput [(ngModel)]="confirmPassword" name="confirmPassword" type="password" required>
              <mat-error *ngIf="password !== confirmPassword">
                Passwords do not match
              </mat-error>
            </mat-form-field>

            <div class="auth-actions">
              <button mat-stroked-button type="button" routerLink="/login" [disabled]="isLoading">
                Back to Login
              </button>
              <button mat-raised-button color="primary" type="submit" 
                [disabled]="password !== confirmPassword || isLoading">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <span *ngIf="!isLoading">Register</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-form.loading {
      opacity: 0.7;
      pointer-events: none;
    }
    button {
      min-width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    mat-spinner {
      margin: 0;
    }
  `]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      return;
    }

    this.isLoading = true;
    this.authService.register({ 
      username: this.username,
      email: this.email, 
      password: this.password 
    })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open(
            'Registration successful! Please check your email for verification.',
            'Close',
            { duration: 5000 }
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(
            error.error.message || 'Registration failed',
            'Close',
            { duration: 5000 }
          );
        }
      });
  }
}
