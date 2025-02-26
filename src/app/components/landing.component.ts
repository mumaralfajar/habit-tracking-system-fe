import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="landing-container">
      <mat-card class="welcome-card" [@fadeIn]>
        <mat-card-header>
          <mat-card-title>
            <h1>Welcome to Habit Tracker</h1>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Start tracking your habits today!</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .landing-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .welcome-card {
      padding: 2rem;
      text-align: center;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      color: #666;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LandingComponent {}
