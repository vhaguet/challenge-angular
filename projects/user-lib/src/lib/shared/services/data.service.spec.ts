import { TestBed } from '@angular/core/testing';

import { DataService } from 'projects/user-lib/src/lib/shared/services/data.service';

describe('InMemoryDataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
