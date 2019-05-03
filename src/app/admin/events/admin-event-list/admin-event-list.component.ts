import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from 'src/app/core/services/events.service';
import { CathedraEvent } from 'src/app/models/event.interface';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.scss']
})
export class AdminEventListComponent implements OnInit {
  events$: Observable<Array<any>>;

  constructor(private events: EventsService) {
    this.events$ = this.events.fetch();
  }
  ngOnInit() {}

  trackById(index, item: CathedraEvent) {
    return item.uid ? item.uid : item;
  }
}
