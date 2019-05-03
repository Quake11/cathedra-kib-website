import { CathedraEvent } from 'src/app/models/event.interface';
import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { MatDialog } from '@angular/material';
import { UtilsService } from 'src/app/core/services/utils.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-event-item',
  templateUrl: './admin-event-item.component.html',
  styleUrls: ['./admin-event-item.component.scss'],
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
export class AdminEventItemComponent implements OnInit {
  @Input()
  item: CathedraEvent;

  progress = 0;

  constructor(
    private events: EventsService,
    public dialog: MatDialog,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  getDate(timestamp: any) {
    return this.utils.getDate(timestamp);
  }

  deleteEvent(e, eventId: string) {
    this.progress = e;
    if (this.progress >= 110) {
      this.events.markDeleted(eventId);
      this.progress = 0;
    }
  }
}
