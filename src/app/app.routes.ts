import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { VerifyEmailComponent } from './components/verify-email.component';
import { LandingComponent } from './components/landing.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'landing', component: LandingComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
