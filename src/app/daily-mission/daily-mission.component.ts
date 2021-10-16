import { DailyMissionService } from './daily-mission.service';
import { DailyMissionRecord, MonthSelectOption, RadarChartData } from './daily-mission.interface';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-daily-mission',
  templateUrl: './daily-mission.component.html',
  styleUrls: ['./daily-mission.component.css']
})
export class DailyMissionComponent implements OnInit {

  missionRecords: DailyMissionRecord[] = [];
  monthTranslateDict: Map<number, string>;
  monthSelectOptions: MonthSelectOption[] = [];
  selectedMonth: MonthSelectOption = {month: -1, text: ''};
  selectedMonthCht = '';

  radarChartLabels: string[];
  radarChartData: RadarChartData[] = [];
  radarChartType = 'radar';
  radarChartOption: ChartOptions;


  constructor(private missionService: DailyMissionService) {
    this.radarChartLabels = this.missionService.getMissionTypes('zhTw');
    this.monthTranslateDict = this.missionService.getMonthTranslateMap();
    this.radarChartOption = {
      responsive: true,
      scale: {
        ticks: {
          beginAtZero: true,
          max: 10,
          min: 0,
          stepSize: 2
        }
      }
    };
  }

  ngOnInit(): void {
    this.missionService.getDailyMissionRecord(new Date('2021-01-01'), new Date('2022-01-01'))
      .subscribe(records => {
        this.missionRecords = records;
        const months = records
          .sort((a, b) => (a.finishedDate > b.finishedDate) ? -1 : 1)
          .map(r => (r.finishedDate as Date).getMonth());

        this.monthSelectOptions = this.getDistinctMonthOptions(months);
        this.selectedMonth = this.monthSelectOptions[0];
        this.selectedMonthCht = this.getMonthCht(this.selectedMonth.month);
        this.radarChartData = this.getRadarChartData(this.selectedMonth.month);
        this.updateChartScale(this.radarChartData[0].data);
      });
  }

  onMonthChange(): void {
    alert(this.selectedMonth);
  }

  private getDistinctMonthOptions(months: number[]): MonthSelectOption[] {
    const distinctMonths = [... new Set(months)];
    return distinctMonths.map(distinctMonth => ({
      month: distinctMonth,
      text: this.getMonthCht(distinctMonth)
    }));
  }

  private getMonthCht(month: number): string{
    const translation = this.monthTranslateDict.get(month);
    return translation ? translation : month.toString();
  }

  private getRadarChartData(month: number): RadarChartData[] {
    const points: number[] = [];
    const typeKeys = this.missionService.getMissionTypes();
    const typeSumMap = new Map<string, number>();
    for (const key of typeKeys) {
      typeSumMap.set(key, 0);
    }

    console.log('aaa', typeSumMap);

    this.missionRecords
      .filter(record =>
        (record.finishedDate as Date).getMonth() === this.selectedMonth.month)
      .forEach(record => {
        let currentPoint = typeSumMap.get(record.missionType);
        if (currentPoint === undefined) {
          currentPoint = 0;
        }
        typeSumMap.set(record.missionType, currentPoint + record.point);
      });

    return [{
      data: Array.from(typeSumMap.values()),
      label: this.selectedMonthCht
    }];
  }

  private updateChartScale(data: number[]): void {
    const maxPoint = Math.max.apply(Math, data.map(x => x));
    const stepOver5 = maxPoint / 5;
    const newTickOption = {
      beginAtZero: true,
      max: maxPoint,
      min: 0,
      stepSize: Math.round(stepOver5 * 2) / 2 // 取近似到 0.5
    };

    if (this.radarChartOption.scale) {
      this.radarChartOption.scale.ticks = newTickOption;
    }
    this.radarChartOption = {...this.radarChartOption};
  }
}
