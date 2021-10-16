import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EducationNoteService {

  noteList: EducationNote[] = [];

  constructor(private http: HttpClient) {
   }

  getEducationNote(startDate: Date, endDate: Date, tags: string[] = [])
  : Observable<EducationNote[]> {
    if (startDate == null) {
      startDate = this.getToday();
    }
    if (endDate == null) {
      endDate = this.getToday();
    }
    if (endDate < startDate) {
      endDate = startDate;
    }
    // return of(this.noteList);
    return this.loadNotesFromJson()
      .pipe(
        map(notes =>
          notes.filter(n => n.dateTime >= startDate && n.dateTime <= endDate))
      );
  }

  private getToday(): Date {
    const now = new Date();
    return new Date(now.toDateString());
  }

  private loadNotesFromJson(staticPath = './assets/edu_notes.json'): Observable<EducationNote[]> {
    return this.http.get<EducationNote[]>(staticPath)
      .pipe(
        map(resp => resp.map(x => {
          x.dateTime = new Date(x.dateTimeStr);
          return x;
        }))
      );
  }
}

export class EducationNote {
  dateTime: Date;
  dateTimeStr: string;
  summary: string[];
  content: string[];
  tags: string[];

  constructor() {
    this.dateTime = new Date();
    this.dateTimeStr = '';
    this.summary = [];
    this.content = [];
    this.tags = [];
  }
}
