import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBody } from './blog-body';

describe('BlogBody', () => {
  let component: BlogBody;
  let fixture: ComponentFixture<BlogBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
