import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when close button is clicked', () => {
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);

    component.onClose();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit close event when backdrop is clicked', () => {
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);

    const mockEvent = {
      target: document.createElement('div'),
      currentTarget: document.createElement('div'),
    } as any;
    mockEvent.target = mockEvent.currentTarget;

    component.onBackdropClick(mockEvent);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not emit close event when modal content is clicked', () => {
    const closeSpy = jest.fn();
    component.close.subscribe(closeSpy);

    const mockEvent = {
      target: document.createElement('div'),
      currentTarget: document.createElement('div'),
    } as any;

    component.onBackdropClick(mockEvent);

    expect(closeSpy).not.toHaveBeenCalled();
  });
});
