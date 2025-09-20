import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavList } from './nav-list';

describe('NavList', () => {
  let component: NavList;
  let fixture: ComponentFixture<NavList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
