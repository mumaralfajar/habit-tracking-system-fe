import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="auth-form" (ngSubmit)="onSubmit()" [class.loading]="isLoading">
            <mat-form-field appearance="outline">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [(ngModel)]="password" name="password" type="password" required>
            </mat-form-field>

            <div class="auth-error" *ngIf="error">
              {{ error }}
            </div>
            <div class="auth-actions">
              <button mat-stroked-button type="button" routerLink="/register" [disabled]="isLoading">
                Create Account
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="isLoading">
                <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                <span *ngIf="!isLoading">Login</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-error {
      color: #f44336;
      margin: 8px 0;
      text-align: center;
    }
    .loading {
      opacity: 0.7;
      pointer-events: none;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  error = '';
  returnUrl: string = '/landing';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    // Get return url from route parameters or default to '/landing'
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/landing';
    });
  }

  onSubmit() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.error = '';

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.error?.message || 'Login failed. Please try again.';
        }
      });
  }
}
