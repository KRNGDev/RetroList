import { TestBed } from '@angular/core/testing';

import { DataRAService } from './data-ra.service';

describe('DataRAService', () => {
  let service: DataRAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
