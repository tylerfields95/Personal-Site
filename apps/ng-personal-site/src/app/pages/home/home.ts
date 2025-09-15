import { Component } from '@angular/core';
import { Blog } from '../../components/blog/blog';
import { BlogService } from '../../services/blog-service';

@Component({
  selector: 'app-home',
  imports: [Blog],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(public blogService: BlogService) {
    this.blogService.getBlogs().subscribe((x: any[]) => {
      console.log(x);
    });
  }
}
