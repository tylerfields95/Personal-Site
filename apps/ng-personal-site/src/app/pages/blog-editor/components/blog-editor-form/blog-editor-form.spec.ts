import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditorForm } from './blog-editor-form';

describe('BlogEditorForm', () => {
  let component: BlogEditorForm;
  let fixture: ComponentFixture<BlogEditorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogEditorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogEditorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
