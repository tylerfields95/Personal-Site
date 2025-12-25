import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogBodyForm } from '../blog-body-form/blog-body-form';

export interface BlogBodyData {
  header?: string;
  subHeader?: string;
  body?: string;
}

export interface BlogFormData {
  header: string;
  subHeader: string;
  author: string;
  bodySections: BlogBodyData[];
}

@Component({
  selector: 'app-blog-editor-form',
  imports: [ReactiveFormsModule, CommonModule, BlogBodyForm],
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
    bodySections: new FormArray<FormGroup>([]),
  });

  private newlyAddedSections = new Set<number>();

  get bodySections(): FormArray<FormGroup> {
    return this.blogForm.get('bodySections') as FormArray<FormGroup>;
  }

  getBodySectionGroup(index: number): FormGroup {
    return this.bodySections.at(index) as FormGroup;
  }

  isSectionNewlyAdded(index: number): boolean {
    return this.newlyAddedSections.has(index);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData']) {
      if (this.initialData) {
        // Patch basic fields
        this.blogForm.patchValue({
          header: this.initialData.header,
          subHeader: this.initialData.subHeader,
          author: this.initialData.author,
        });

        // Clear and rebuild body sections
        this.bodySections.clear();
        this.newlyAddedSections.clear();
        if (this.initialData.bodySections?.length) {
          this.initialData.bodySections.forEach(section => {
            this.bodySections.push(this.createBodySectionGroup(section));
          });
        }
      } else {
        this.blogForm.reset();
        this.bodySections.clear();
        this.newlyAddedSections.clear();
      }
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formValue = this.blogForm.value;
      this.formSubmit.emit({
        header: formValue.header!,
        subHeader: formValue.subHeader!,
        author: formValue.author!,
        bodySections: formValue.bodySections || [],
      });
    } else {
      this.markAllAsTouched();
    }
  }

  addBodySection(): void {
    const newIndex = this.bodySections.length;
    this.bodySections.push(this.createBodySectionGroup());
    this.newlyAddedSections.add(newIndex);
  }

  removeBodySection(index: number): void {
    this.bodySections.removeAt(index);
    // Update the Set to reflect the removed index
    this.newlyAddedSections.delete(index);
    // Shift down all indices greater than the removed index
    const updatedSet = new Set<number>();
    this.newlyAddedSections.forEach(i => {
      if (i > index) {
        updatedSet.add(i - 1);
      } else {
        updatedSet.add(i);
      }
    });
    this.newlyAddedSections = updatedSet;
  }

  private createBodySectionGroup(data?: BlogBodyData): FormGroup {
    return new FormGroup({
      header: new FormControl<string>(data?.header || ''),
      subHeader: new FormControl<string>(data?.subHeader || ''),
      body: new FormControl<string>(data?.body || ''),
    });
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

  get hasChanges(): boolean {
    return this.blogForm.dirty || this.blogForm.touched;
  }
}
