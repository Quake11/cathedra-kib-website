import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/models/group.interface';
import { GroupsService } from 'src/app/core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input()
  group: Group;

  studentsCount$: Observable<number>;
  progress = 0;

  constructor(private groups: GroupsService, private users: UsersService) {}

  ngOnInit() {
    this.studentsCount$ = this.users.fetchCountForGroup(this.group.uid);
  }

  deleteGroup(e, groupId: string) {
    this.progress = e;
    if (this.progress >= 110) {
      this.groups.markDeleted(groupId);
      this.progress = 0;
    }
  }
}
