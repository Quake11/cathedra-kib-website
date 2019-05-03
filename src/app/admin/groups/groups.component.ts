import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.interface';
import { GroupsService } from 'src/app/core/services/groups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CathedraEvent } from 'src/app/models/event.interface';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class GroupsComponent implements OnInit {
  groups$: Observable<Array<Group>>;

  form: FormGroup;

  constructor(private groups: GroupsService, private fb: FormBuilder) {
    this.groups$ = this.groups.fetch();
  }

  ngOnInit() {
    this.form = this.fb.group({ name: ['', Validators.required] });
  }

  addGroup(data: Group) {
    this.groups.add(data);
  }

  trackById(index, item: CathedraEvent) {
    return item.uid ? item.uid : item;
  }
}
