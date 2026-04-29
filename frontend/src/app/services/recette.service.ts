import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`);
  }

  // Recipes
  getRecettes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recettes`);
  }

  // Get recipes with search and filter
  getRecettesWithFilter(filters?: any): Observable<any[]> {
    let params = '';
    if (filters) {
      if (filters.name) params += `name=${encodeURIComponent(filters.name)}&`;
      if (filters.category) params += `category=${filters.category}&`;
      if (filters.difficulty) params += `difficulty=${filters.difficulty}&`;
    }
    return this.http.get<any[]>(`${this.apiUrl}/recettes?${params}`);
  }

  getRecetteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recettes/${id}`);
  }

  createRecette(recette: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recettes`, recette);
  }

  updateRecette(id: string, recette: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/recettes/${id}`, recette);
  }

  deleteRecette(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/recettes/${id}`);
  }
}
