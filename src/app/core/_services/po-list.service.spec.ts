import { TestBed } from '@angular/core/testing';

import { PoListService } from './po-list.service';

describe('PoListService', () => {
  let service: PoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
