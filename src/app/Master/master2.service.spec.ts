import { TestBed } from '@angular/core/testing';

import { Master2Service } from './master2.service';

describe('Master2Service', () => {
  let service: Master2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Master2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
