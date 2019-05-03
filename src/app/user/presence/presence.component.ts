import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PresenceService } from 'src/app/core/presence.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
  @Input()
  uid: string;

  presence$: Observable<any>;

  constructor(private presence: PresenceService) {}

  ngOnInit() {
    this.presence$ = this.presence.getPresence(this.uid);
  }
}
