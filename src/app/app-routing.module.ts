import { DailyMissionComponent } from './daily-mission/daily-mission.component';
import { EducationNoteComponent } from './education-note/education-note.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// cd C:\Users\funny\source\repos\WebApplication4\WebApplication4\bin\Debug\net5.0
// cd D:\Coding\_repo\angular_11\education-notes
const routes: Routes = [
  { path: 'educationNote', component: EducationNoteComponent },
  { path: 'dailyMission', component: DailyMissionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
