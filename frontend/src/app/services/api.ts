import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}

  // Fetch teachers
  getTeachers() {
    return this.http.get(`${environment.apiUrl}/teachers`);
  }

  // Fetch gallery events
  getGallery() {
    return this.http.get(`${environment.apiUrl}/gallery`);
  }

  // Fetch notices
  getNotices() {
    return this.http.get(`${environment.apiUrl}/notice`);
  }

  // Fetch events
  getEvents() {
    return this.http.get(`${environment.apiUrl}/events`);
  }

  // Fetch gallery by ID (optional)
  getGalleryById(id: string | number) {
    return this.http.get(`${environment.apiUrl}/gallery/${id}`);
  }

  // Add or update gallery
  saveGallery(data: any) {
    if (data.id) {
      // Update existing gallery
      return this.http.put(`${environment.apiUrl}/gallery/${data.id}`, data);
    } else {
      // Add new gallery
      return this.http.post(`${environment.apiUrl}/gallery`, data);
    }
  }

  // Delete gallery
  deleteGallery(id: string | number) {
    return this.http.delete(`${environment.apiUrl}/gallery/${id}`);
  }
}