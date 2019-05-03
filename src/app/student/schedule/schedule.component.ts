import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Schedule } from 'src/app/models/schedule.interface';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedules$: Observable<Array<Schedule>>;

  constructor(private schedule: ScheduleService) {
    this.schedules$ = this.schedule.fetch();
  }

  ngOnInit() {}
}
