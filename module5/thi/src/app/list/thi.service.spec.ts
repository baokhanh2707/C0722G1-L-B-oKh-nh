import { TestBed } from '@angular/core/testing';

import { ThiService } from './thi.service';

describe('ThiService', () => {
  let service: ThiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
