import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // CATEGORIES
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }

  // RECIPES
  getRecettes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recettes`);
  }

  getRecette(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recettes/${id}`);
  }

  createRecette(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recettes`, data);
  }

  updateRecette(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/recettes/${id}`, data);
  }

  deleteRecette(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recettes/${id}`);
  }
}
