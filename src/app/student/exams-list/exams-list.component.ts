import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupsService } from 'src/app/core/services/groups.service';
import { Group } from 'src/app/models/group.interface';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss']
})
export class ExamsListComponent implements OnInit {
  groups$: Observable<Array<Group>>;

  constructor(private groups: GroupsService) {}

  ngOnInit() {
    this.groups$ = this.groups.fetch();
  }
}
