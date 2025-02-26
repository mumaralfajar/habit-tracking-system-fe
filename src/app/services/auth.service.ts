import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../interfaces/auth.interface';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiGateway;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

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
          this.tokenService.setTokens(response.data.accessToken, response.data.refreshToken);
          localStorage.setItem('username', response.data.username);
        }
      })
    );
  }

  logout() {
    const accessToken = this.tokenService.getToken();
    const refreshToken = this.tokenService.getRefreshToken();
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };
    
    const result = this.http.post(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.LOGOUT}?refreshToken=${refreshToken}`,
      {},
      { headers }
    );
    this.tokenService.clearTokens();
    return result;
  }

  verifyEmail(token: string) {
    return this.http.get<ApiResponse<void>>(
      `${this.apiUrl}${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`
    );
  }
}
