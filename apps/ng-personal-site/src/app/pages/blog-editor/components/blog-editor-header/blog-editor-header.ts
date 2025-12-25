import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-blog-editor-header',
  imports: [],
  templateUrl: './blog-editor-header.html',
  styleUrl: './blog-editor-header.scss',
})
export class BlogEditorHeader {
  readonly add = output<void>();
  readonly back = output<void>();
  readonly isPreviewMode = input<boolean>(false);

  /**
   * Handle add new blog action
   */
  public onAdd(): void {
    this.add.emit();
  }

  /**
   * Handle back from preview action
   */
  public onBack(): void {
    this.back.emit();
  }
}
