import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, Inquiry } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUri = 'http://localhost:3000';

  // --- PROJECTS ---

  getProjects(filters?: {
    category?: string;
    search?: string;
    sortBy?: string;
  }): Observable<Project[]> {
    let params = new HttpParams();
    
    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }

    return this.http.get<Project[]>(`${this.apiUri}/projects`, { params });
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUri}/projects/${id}`);
  }

  createProject(project: Omit<Project, 'id' | 'views' | 'createdAt'>): Observable<Project> {
    return this.http.post<Project>(`${this.apiUri}/projects`, project);
  }

  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUri}/projects/${id}`, project);
  }

  deleteProject(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUri}/projects/${id}`);
  }

  // --- INQUIRIES ---

  getInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.apiUri}/inquiries`);
  }

  submitInquiry(inquiry: Omit<Inquiry, 'id' | 'projectName' | 'createdAt'>): Observable<Inquiry> {
    return this.http.post<Inquiry>(`${this.apiUri}/inquiries`, inquiry);
  }

  deleteInquiry(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUri}/inquiries/${id}`);
  }
}
