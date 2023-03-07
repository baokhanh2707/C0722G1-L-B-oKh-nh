import { TestBed } from '@angular/core/testing';

import { BehaviorServiceService } from './behavior-service.service';

describe('BehaviorServiceService', () => {
  let service: BehaviorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
