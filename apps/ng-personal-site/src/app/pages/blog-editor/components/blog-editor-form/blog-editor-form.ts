import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePicker } from '../../../../components/date-picker/date-picker';

export interface BlogFormData {
  header: string;
  subHeader: string;
  author: string;
}

@Component({
  selector: 'app-blog-editor-form',
  imports: [ReactiveFormsModule, CommonModule, DatePicker],
  templateUrl: './blog-editor-form.html',
  styleUrl: './blog-editor-form.scss',
})
export class BlogEditorForm implements OnChanges {
  @Input() initialData?: BlogFormData;
  @Input() isEditing = false;
  @Output() formSubmit = new EventEmitter<BlogFormData>();
  @Output() formCancel = new EventEmitter<void>();

  blogForm = new FormGroup({
    header: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    subHeader: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>('', [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData']) {
      if (this.initialData) {
        this.blogForm.patchValue(this.initialData);
      } else {
        this.blogForm.reset();
      }
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      this.formSubmit.emit(this.blogForm.value as BlogFormData);
    } else {
      this.markAllAsTouched();
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  onReset() {
    this.blogForm.reset();
  }

  private markAllAsTouched() {
    Object.keys(this.blogForm.controls).forEach(key => {
      this.blogForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.blogForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.blogForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      header: 'Header',
      subHeader: 'Subheader',
      author: 'Author'
    };
    return labels[fieldName] || fieldName;
  }
}
