import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  getAllCategories(options: SortingState) {
    return this.http.post(
      `${environment.baseUrl}/admin/categoryManagement/list`,
      options,
      { headers: { Authorization: this.storage.getBearerToken() } },
    );
  }

  getCategory(_id: string) {
    return this.http.post(
      `${environment.baseUrl}/admin/categoryManagement/view`,
      { _id },
      { headers: { Authorization: this.storage.getBearerToken() } },
    );
  }
}
interface SortingState {
  page: number;
  limit: number;
  sortOrder: 'ASC' | 'DESC' | '';
  sortBy: string;
}
