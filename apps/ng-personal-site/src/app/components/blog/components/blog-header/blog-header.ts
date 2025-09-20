import { Component, input } from '@angular/core';
import { BlogContent } from '../../../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-header',
  imports: [DatePipe],
  templateUrl: './blog-header.html',
  styleUrl: './blog-header.scss',
})
export class BlogHeader {
  public blogData = input<BlogContent>();
}
