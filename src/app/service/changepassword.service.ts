import { Injectable } from '@angular/core';
import { StorageService } from './storage-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangepasswordService {
  constructor(private storage: StorageService, private http: HttpClient) {}

  changePassword(newPassword: string, currentPassword: string) {
    const _id = this.storage.getUserID();
    return this.http.post(`${environment.baseUrl}/auth/changePassword`, {
      _id,
      currentPassword,
      newPassword,
    });
  }
}
