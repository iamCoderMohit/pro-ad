import { TestBed } from '@angular/core/testing';

import { Pages } from './pages';

describe('Pages', () => {
  let service: Pages;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pages);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
