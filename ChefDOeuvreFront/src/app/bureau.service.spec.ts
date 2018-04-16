import { TestBed, inject } from '@angular/core/testing';

import { BureauService } from './bureau.service';

describe('BureauService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BureauService]
    });
  });

  it('should be created', inject([BureauService], (service: BureauService) => {
    expect(service).toBeTruthy();
  }));
});
