import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Blog } from '../components/blog/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiUrl = environment.apiUrl + '/api/Blog';
  constructor(public httpClient: HttpClient) {}

  public getBlogs(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(this.apiUrl);
  }
}
