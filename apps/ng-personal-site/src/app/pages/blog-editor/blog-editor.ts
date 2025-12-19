import { Component } from '@angular/core';
import { BlogEditorCard } from '../../components/blog-editor-card/blog-editor-card';

@Component({
  selector: 'app-blog-editor',
  imports: [BlogEditorCard],
  templateUrl: './blog-editor.html',
  styleUrl: './blog-editor.scss',
})
export class BlogEditor {
  constructor() {}
}
