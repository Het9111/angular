import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getToken() {
    return JSON.parse(localStorage.getItem('accessToken') ?? '');
  }

  getBearerToken() {
    const token = JSON.parse(localStorage.getItem('accessToken') ?? '');

    return `Bearer ${token}`;
  }

  setData(fieldName: string, data: any) {
    localStorage.setItem(fieldName, JSON.stringify(data));
  }

  getUserID() {
    const userData = JSON.parse(localStorage.getItem('userData') || '');
    return userData._id;
  }

  removeData() {
    localStorage.clear();
  }
}
