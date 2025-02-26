import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Email Verification</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="verification-content">
            <mat-spinner *ngIf="isVerifying"></mat-spinner>
            <p *ngIf="message">{{ message }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .verification-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }
  `]
})
export class VerifyEmailComponent implements OnInit {
  isVerifying = true;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.message = 'Invalid verification link';
      this.isVerifying = false;
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.message = 'Email verified successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        this.message = error.error.message || 'Verification failed';
        this.isVerifying = false;
      }
    });
  }
}
