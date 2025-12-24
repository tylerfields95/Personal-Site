import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-markdown-toolbar',
  imports: [],
  templateUrl: './markdown-toolbar.html',
  styleUrl: './markdown-toolbar.scss',
})
export class MarkdownToolbar {
  // Input to know if we're in preview mode
  readonly isPreview = input<boolean>(false);

  // Heading actions
  readonly heading1 = output<void>();
  readonly heading2 = output<void>();
  readonly heading3 = output<void>();

  // Text formatting actions
  readonly bold = output<void>();
  readonly italic = output<void>();
  readonly strikethrough = output<void>();

  // Code actions
  readonly code = output<void>();
  readonly codeBlock = output<void>();

  // List and quote actions
  readonly quote = output<void>();
  readonly unorderedList = output<void>();
  readonly orderedList = output<void>();
  readonly taskList = output<void>();

  // Link and media actions
  readonly link = output<void>();
  readonly image = output<void>();
  readonly table = output<void>();
  readonly horizontalRule = output<void>();

  // Preview toggle
  readonly togglePreview = output<void>();

  onHeading1(): void {
    this.heading1.emit();
  }

  onHeading2(): void {
    this.heading2.emit();
  }

  onHeading3(): void {
    this.heading3.emit();
  }

  onBold(): void {
    this.bold.emit();
  }

  onItalic(): void {
    this.italic.emit();
  }

  onStrikethrough(): void {
    this.strikethrough.emit();
  }

  onCode(): void {
    this.code.emit();
  }

  onCodeBlock(): void {
    this.codeBlock.emit();
  }

  onQuote(): void {
    this.quote.emit();
  }

  onUnorderedList(): void {
    this.unorderedList.emit();
  }

  onOrderedList(): void {
    this.orderedList.emit();
  }

  onTaskList(): void {
    this.taskList.emit();
  }

  onLink(): void {
    this.link.emit();
  }

  onImage(): void {
    this.image.emit();
  }

  onTable(): void {
    this.table.emit();
  }

  onHorizontalRule(): void {
    this.horizontalRule.emit();
  }

  onTogglePreview(): void {
    this.togglePreview.emit();
  }
}
