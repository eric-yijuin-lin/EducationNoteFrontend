import { TestBed } from '@angular/core/testing';

import { DailyMissionService } from './daily-mission.service';

describe('DailyMissionService', () => {
  let service: DailyMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
