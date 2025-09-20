import { Component, input } from '@angular/core';
import { BlogContent } from '../../models';
import { BlogHeader } from './components/blog-header/blog-header';
import { BlogBody } from './components/blog-body/blog-body';

@Component({
  selector: 'app-blog',
  imports: [BlogHeader, BlogBody],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  public blogData = input<BlogContent>();

  constructor() {}
}
