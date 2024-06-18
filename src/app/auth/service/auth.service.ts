import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from 'src/app/service/storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  login(data: LoginData) {
    return this.http.post(`${environment.baseUrl}/auth/login`, data);
  }

  logout() {
    return this.http.post(
      `${environment.baseUrl}/auth/logout`,
      {},
      { headers: { Authorization: this.storage.getBearerToken() } },
    );
  }

  forgotpassword(email: string) {
    return this.http.post(`${environment.baseUrl}/auth/forgotPassword`, {
      email,
    });
  }

  resetPassword(newPassword: string, token: string) {
    return this.http.post(`${environment.baseUrl}/auth/resetPassword`, {
      token,
      newPassword,
    });
  }
}

interface LoginData {
  email: string | null;
  password: string | null;
  role: 'admin';
  deviceId: 'admin';
  fcmToken: 'admin';
}
