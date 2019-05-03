import { Component, OnInit } from '@angular/core';
import { EventsService } from '../core/services/events.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0.3, transform: 'translateX(30px)' }),
        animate('400ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class StudentComponent implements OnInit {
  events$: Observable<any>;

  options: any;
  constructor(private events: EventsService) {}

  ngOnInit() {
    this.events$ = this.events.fetch();
    this.events$.subscribe(ev => {
      ev.forEach(event => {
        // console.log(event);
        /*
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        event['actions'] = this.actions; */
      });
    });

    this.options = {
      locale: 'ru',
      firstDay: 1
    };
    /*
    this.events = [
      {
        title: "All Day Event",
        start: "2019-01-01"
      },
      {
        title: "Long Event",
        start: "2019-01-07",
        end: "2019-01-10"
      },
      {
        title: "Repeating Event",
        start: "2019-01-09T16:00:00"
      },
      {
        title: "Repeating Event",
        start: "2019-01-16T16:00:00"
      },
      {
        title: "Conference",
        start: "2019-01-11",
        end: "2019-01-13"
      }
    ]; */
  }
}
