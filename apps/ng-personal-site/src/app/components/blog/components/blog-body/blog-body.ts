import { Component, input } from '@angular/core';
import { BlogContent } from '../../../../models';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-blog-body',
  imports: [MarkdownComponent],
  templateUrl: './blog-body.html',
  styleUrl: './blog-body.scss',
})
export class BlogBody {
  public blogData = input<BlogContent>();
}
