import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditorHeader } from './blog-editor-header';

describe('BlogEditorHeader', () => {
  let component: BlogEditorHeader;
  let fixture: ComponentFixture<BlogEditorHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogEditorHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogEditorHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
