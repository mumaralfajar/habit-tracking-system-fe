import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../interfaces/auth.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiGateway;

  constructor(private http: HttpClient) {}

  register(userData: RegisterRequest) {
    return this.http.post<ApiResponse<RegisterResponse>>(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.REGISTER}`,
      userData
    );
  }

  login(credentials: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
      credentials
    ).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('username', response.data.username);
        }
      })
    );
  }

  logout() {
    return this.http.post(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGOUT}`, 
      {}
    );
  }

  verifyEmail(token: string) {
    return this.http.get<ApiResponse<void>>(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`
    );
  }
}
