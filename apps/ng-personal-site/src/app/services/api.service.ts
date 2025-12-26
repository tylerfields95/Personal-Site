import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogContent } from '../models/blogContent';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHello(): Observable<string> {
    return this.http.get(`${this.apiUrl}`, { responseType: 'text' });
  }

  getAllBlogs(): Observable<BlogContent[]> {
    return this.http.get<BlogContent[]>(`${this.apiUrl}/blog`);
  }

  getBlogByIndex(index: number): Observable<BlogContent> {
    return this.http.get<BlogContent>(`${this.apiUrl}/blog/${index}`);
  }
}
