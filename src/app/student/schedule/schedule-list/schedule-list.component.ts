import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';

import { User } from 'src/app/models/user.interface';
import { LoginDialogComponent } from 'src/app/login/login-dialog/login-dialog.component';
import { Schedule } from 'src/app/models/schedule.interface';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  schedules$: Observable<Array<Schedule>>;
  user$: Observable<User>;
  isSubbedToSchedules$: Observable<boolean>;

  constructor(
    private schedule: ScheduleService,
    private auth: AuthService,
    private dialog: MatDialog,
    private notifications: NotificationsService,
    private snackBar: MatSnackBar
  ) {
    this.schedules$ = this.schedule.fetch();
    this.user$ = this.auth.user$.pipe(filter(user => !!user));

    /*     this.isSubbedToSchedules$ = this.user$.pipe(
      mergeMap(user => {
        return this.notifications.isActive(user.uid, 'schedules');
      })
    ); */

    // this.isSubbedToSchedules$ = this.messaging.isSubbed();
  }

  ngOnInit() {
    // this.hasToken$().subscribe(hastoken => console.log('hasToken', hastoken));

    this.user$.subscribe(user => {
      this.notifications.requestPermission(user);
      this.isSubbedToSchedules$ = this.notifications.isSubbed(
        user.uid,
        'schedules'
      );
    });
  }

  subscribeToSchedules(user: User) {
    this.notifications.add(user, 'schedules').then(() => {
      this.snackBar.open('Вы подписались на уведомления о расписаниях!', 'ОК', {
        duration: 5000
      });
    });
  }

  cancelSubToSchedules(user: User) {
    this.notifications.remove(user.uid, 'schedules').then(() => {
      this.snackBar.open('Вы отписались от рассылки на расписания.', 'ОК', {
        duration: 3000
      });
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '350px'
    });
  }
}
