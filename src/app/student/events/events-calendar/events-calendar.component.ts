import { EventsService } from 'src/app/core/services/events.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.scss']
})
export class EventsCalendarComponent implements OnInit {
  events$: Observable<any>;

  options: any;
  constructor(private events: EventsService) {}

  ngOnInit() {
    this.events$ = this.events.fetch();

    this.options = {
      locale: 'ru',
      firstDay: 1
    };
  }
}
