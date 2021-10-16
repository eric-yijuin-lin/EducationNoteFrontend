import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EducationNote, EducationNoteService } from './education-note.service';

@Component({
  selector: 'app-education-note',
  templateUrl: './education-note.component.html',
  styleUrls: ['./education-note.component.css']
})
export class EducationNoteComponent implements OnInit, AfterViewInit {

  selectedDate: any;
  distinctNoteDateList: string[] = [];
  displayingNote = new EducationNote();
  noteListCache: EducationNote[] = [];

  constructor(private noteService: EducationNoteService) { }

  ngOnInit(): void {
    this.noteService.getEducationNote(new Date('2021-01-01'), new Date('2022-01-01'), [])
      .subscribe(notes => {
        if (notes.length) {
          notes = this.sortNotesDecending(notes);
          this.distinctNoteDateList = this.getDistinctNoteDates(notes);
          this.displayingNote = notes[0];
          this.selectedDate = notes[0].dateTimeStr;
          this.noteListCache = notes;
        }
      });
  }

  ngAfterViewInit(): void {
  }

  onSelectedDateChanged(date: string): void {
    if (this.noteListCache && this.noteListCache.length > 0) {
      const foundNote = this.noteListCache.find(x => x.dateTimeStr === date);
      if (foundNote) {
        this.displayingNote = foundNote;
      }
    }
  }

  private sortNotesDecending(notes: EducationNote[]): EducationNote[] {
    return notes.sort((n1, n2) => {
      // order by decending
      if (n1.dateTime < n2.dateTime) {
        return 1;
      }
      if (n1.dateTime > n2.dateTime) {
        return -1;
      }
      return 0;
    });
  }

  private getDistinctNoteDates(notes: EducationNote[]): string[] {
    const tempSet = new Set(notes.map(x => x.dateTimeStr));
    return [...tempSet];
  }
}
