import { Component, Input, Output, EventEmitter, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownEditor } from '../../../../components/markdown-editor/markdown-editor';
import { ConfirmationPopover, PopoverPosition, PopoverVariant } from '../../../../components/confirmation-popover/confirmation-popover';

@Component({
  selector: 'app-blog-body-form',
  imports: [ReactiveFormsModule, CommonModule, MarkdownEditor, ConfirmationPopover],
  templateUrl: './blog-body-form.html',
  styleUrl: './blog-body-form.scss',
})
export class BlogBodyForm implements OnInit {
  @Input() bodyFormGroup!: FormGroup;
  @Input() index!: number;
  @Input() initiallyExpanded = true;
  @Output() remove = new EventEmitter<void>();

  // Expose enums to template
  readonly PopoverPosition = PopoverPosition;
  readonly PopoverVariant = PopoverVariant;

  isExpanded = signal(true);

  ngOnInit() {
    this.isExpanded.set(this.initiallyExpanded);
  }

  toggleExpanded(): void {
    this.isExpanded.update(v => !v);
  }

  onRemove(): void {
    this.remove.emit();
  }

  get header(): string {
    return this.bodyFormGroup.get('header')?.value || 'New Section';
  }

  get subHeader(): string {
    return this.bodyFormGroup.get('subHeader')?.value || '';
  }
}
