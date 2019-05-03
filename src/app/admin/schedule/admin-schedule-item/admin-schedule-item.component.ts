import { ScheduleService } from 'src/app/core/services/schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from 'src/app/models/schedule.interface';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-schedule-item',
  templateUrl: './admin-schedule-item.component.html',
  styleUrls: ['./admin-schedule-item.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0.5, transform: 'translateY(-10px)' }),
        animate('150ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0px)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ])
    ])
  ]
})
export class AdminScheduleItemComponent implements OnInit {
  @Input()
  item: Schedule;

  url$: Observable<string>;

  progress = 0;

  constructor(
    private utils: UtilsService,
    private dialog: MatDialog,
    private schedule: ScheduleService
  ) {}

  ngOnInit() {
    if (this.item.filePath) {
      this.getScheduleFileUrl(this.item.filePath);
    }
  }

  getScheduleFileUrl(filePath) {
    this.url$ = this.utils.getFileDownloadUrl(filePath);
  }

  deleteSchedule(e, id: string) {
    this.progress = e;
    // Not really, deleting. Marking as deleted
    if (this.progress >= 110) {
      this.schedule.markDeleted(id);
      this.progress = 0;
    }
  }
}
