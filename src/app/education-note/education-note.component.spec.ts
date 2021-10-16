import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationNoteComponent } from './education-note.component';

describe('EducationNoteComponent', () => {
  let component: EducationNoteComponent;
  let fixture: ComponentFixture<EducationNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
