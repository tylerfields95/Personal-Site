import { Component, output } from '@angular/core';

@Component({
  selector: 'app-blog-editor-header',
  imports: [],
  templateUrl: './blog-editor-header.html',
  styleUrl: './blog-editor-header.scss',
})
export class BlogEditorHeader {
  readonly add = output<void>();

  /**
   * Handle add new blog action
   */
  public onAdd(): void {
    this.add.emit();
  }
}
