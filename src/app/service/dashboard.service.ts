import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  getDashBoardData() {
    const token = this.storageService.getBearerToken();
    return this.http.post(
      `${environment.baseUrl}/admin/dashboard`,
      {},
      { headers: { Authorization: token } },
    );
  }
}
