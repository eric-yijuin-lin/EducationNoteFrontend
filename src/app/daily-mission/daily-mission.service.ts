import { filter, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyMissionRecord } from './daily-mission.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyMissionService {

  apiUrl = environment.apiUrl;
  missionTypeMap = new Map([
    ['required', {zhTw: '必要', iconCode: 'grade'}],
    ['mental', {zhTw: '心靈', iconCode: 'self_improvement'}],
    ['skill',  {zhTw: '技能', iconCode: 'school'}],
    ['exercise',  {zhTw: '運動', iconCode: 'sports_tennis'}],
    ['social',  {zhTw: '社交', iconCode: 'people'}],
    ['entertainment',  {zhTw: '娛樂', iconCode: 'sports_esports'}],
  ]);

  constructor(private http: HttpClient) { }

  getMissionTypes (lang = ''): string[] {
    let result: string[] = [];

    if (lang.toLowerCase() === 'zhtw') {
      result = Array.from(this.missionTypeMap.values()).map(type => type.zhTw);
    } else {
      result = Array.from(this.missionTypeMap.keys());
    }
    return result;
  }

  getMonthTranslateMap(): Map<number, string> {
    return new Map<number, string>([
      [0, '一月'],
      [1, '二月'],
      [2, '三月'],
      [3, '四月'],
      [4, '五月'],
      [5, '六月'],
      [6, '七月'],
      [7, '八月'],
      [8, '九月'],
      [9, '十月'],
      [10, '十一月'],
      [11, '十二月'],
    ]);
  }

  getDailyMissionRecord(startDate: Date, endDate: Date): Observable<DailyMissionRecord[]> {
    const utcts = new Date().getTime() / 1000;
    const today = new Date(
      Math.floor(utcts / 86400) * 86400 * 1000
    );

    if (startDate > today) {
      startDate = today;
      endDate = today;
    }
    if (endDate < startDate) {
      endDate = startDate;
    }

    return this.http
      .get<DailyMissionRecord[]>(`${this.apiUrl}/api/DailyMission`)
      .pipe(
        map(resp => resp.map(dto => {
          dto.finishedDate = new Date(dto.finishedDate);
          const typeInfo = this.missionTypeMap.get(dto.missionType);
          dto.missionTypeCht = typeInfo? typeInfo.zhTw : '';
          dto.iconCode = typeInfo? typeInfo.iconCode : '';
          return dto;
        }))
      );
  }
}
