import { TestBed } from '@angular/core/testing';

import { Viewport } from './viewport';

describe('Viewport', () => {
  let service: Viewport;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Viewport);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
