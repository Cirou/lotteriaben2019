import { TestBed, inject } from '@angular/core/testing';

import { VotationService } from './votation.service';

describe('VotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotationService]
    });
  });

  it('should be created', inject([VotationService], (service: VotationService) => {
    expect(service).toBeTruthy();
  }));
});
