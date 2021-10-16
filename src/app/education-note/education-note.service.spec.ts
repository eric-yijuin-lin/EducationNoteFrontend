import { TestBed } from '@angular/core/testing';

import { EducationNoteService } from './education-note.service';

describe('EducationNoteService', () => {
  let service: EducationNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
