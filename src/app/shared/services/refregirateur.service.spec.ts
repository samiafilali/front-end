import { TestBed } from '@angular/core/testing';

import { RefregirateurService } from './refregirateur.service';

describe('RefregirateurService', () => {
  let service: RefregirateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefregirateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
