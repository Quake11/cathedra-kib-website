import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { MatTableDataSource, MatSort } from '@angular/material';
import { GroupsService } from 'src/app/core/services/groups.service';
import { Group } from 'src/app/models/group.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<Array<User>>;
  groups$: Observable<Array<Group>>;

  roles: Object;

  displayedColumns: string[] = [
    'displayName',
    'lastname',
    'firstname',
    'middlename',
    'group',
    'roles',
    'confirm'
  ];

  dataSource: MatTableDataSource<User>;

  sort: MatSort;
  @ViewChild(MatSort) set content(content: MatSort) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sortingDataAccessor = (user, property) => {
        switch (property) {
          case 'group':
            return user.groupName;
          default:
            return user[property];
        }
      };
      this.dataSource.sort = this.sort;
    }
  }

  constructor(
    private users: UsersService,
    private ref: ChangeDetectorRef,
    private groups: GroupsService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.roles = this.utils.roles;
    this.users$ = this.users.fetch();
    this.groups$ = this.groups.fetch();

    this.users$.subscribe(users => {
      this.setDataSource(users);
    });
  }

  changeStudentGroup(group: string, userId: string, groups: Array<Group>) {
    if (group !== 'null') {
      const groupName: string = groups.find(g => g.uid === group).name;
      this.users.update(userId, { group: group, groupName });
    } else {
      this.users.update(userId, {
        group: firestore.FieldValue.delete(),
        groupName: firestore.FieldValue.delete()
      });
    }
  }

  setDataSource(usersData) {
    this.dataSource = new MatTableDataSource(usersData);
  }

  confirmStudentGroup(user: User, confirmed: true) {
    this.users.changeGroupConfirmed(user.uid, { confirmed });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.ref.markForCheck();
  }

  addRole(userId, role) {
    this.users.updateRole(userId, role, true);
  }

  removeRole(userId, role) {
    this.users.updateRole(userId, role, false);
  }

  getRoleName(role: string): string {
    return this.utils.getRoleName(role);
  }

  trackById(index, user: User) {
    return user.uid;
  }
}
