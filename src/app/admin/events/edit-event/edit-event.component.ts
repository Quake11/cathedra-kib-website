import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, empty } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { firestore } from 'firebase/app';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/core/services/events.service';
import { User } from 'src/app/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { CathedraEvent } from 'src/app/models/event.interface';
import { switchMap } from 'rxjs/operators';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  id: string;

  eventForm: FormGroup;

  eventAdding = false;
  eventAdded = false;

  addedEventId: string;

  author$: Observable<User>;

  user: User;
  userSub: Subscription;

  routeSub: Subscription;
  eventSub: Subscription;

  editableEvent$: Observable<CathedraEvent>;

  constructor(
    private events: EventsService,
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private users: UsersService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(user => (this.user = user));
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      description: [''],
      color: [''],
      allDay: [false]
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.editableEvent$ = this.events.getById(this.id);
    });

    this.author$ = this.editableEvent$.pipe(
      switchMap(eventObject => {
        if (eventObject.authorId) {
          return this.users.getData(eventObject.authorId);
        } else {
          return empty();
        }
      })
    );

    this.eventSub = this.editableEvent$.subscribe(
      (eventObject: CathedraEvent) => {
        console.log(eventObject);

        this.eventForm.setValue({
          title: eventObject.title,
          startDate: new Date(eventObject.start).toISOString(),
          startTime: new Date(eventObject.start).toLocaleTimeString(),
          endDate: new Date(eventObject.end),
          endTime: new Date(eventObject.end).toLocaleTimeString(),
          start: eventObject.start,
          end: eventObject.end,
          description: eventObject.description,
          color: eventObject.color,
          allDay: eventObject.allDay
        });
      }
    );

    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      start: [''],
      end: [''],
      description: [''],
      color: [''],
      allDay: [false]
    });

    this.formatDatetime();
  }

  formatDatetime() {
    // format start date
    this.eventForm.controls['startDate'].valueChanges.subscribe(
      (value: Date) => {
        const result = moment.utc(value).utcOffset(180);

        const startTime = this.eventForm.controls['startTime'];
        if (!startTime.value) {
          return;
        }
        const timeArray = startTime.value.split(':');
        const startHours = +timeArray[0];
        const startMinutes = +timeArray[1];

        result.set({
          hour: startHours,
          minute: startMinutes,
          second: 0,
          millisecond: 0
        });

        this.eventForm.controls['start'].setValue(result.format(), {
          emitEvent: false
        });
      }
    );

    this.eventForm.controls['startTime'].valueChanges.subscribe(
      (value: string) => {
        const startDate = this.eventForm.controls['startDate'];
        if (!startDate.value) {
          return;
        }

        const timeArray = value.split(':');
        const startHours = +timeArray[0];
        const startMinutes = +timeArray[1];

        const result = moment(startDate.value)
          .set({
            hour: startHours,
            minute: startMinutes,
            second: 0,
            millisecond: 0
          })
          .format();

        this.eventForm.controls['start'].setValue(result, {
          emitEvent: false
        });
      }
    );

    // format end date
    this.eventForm.controls['endDate'].valueChanges.subscribe((value: Date) => {
      const result = moment.utc(value).utcOffset(180);

      const endTime = this.eventForm.controls['endTime'];
      if (!endTime.value) {
        return;
      }
      const timeArray = endTime.value.split(':');
      const endHours = +timeArray[0];
      const endMinutes = +timeArray[1];

      result.set({
        hour: endHours,
        minute: endMinutes,
        second: 0,
        millisecond: 0
      });

      this.eventForm.controls['end'].setValue(result.format(), {
        emitEvent: false
      });
    });

    this.eventForm.controls['endTime'].valueChanges.subscribe(
      (value: string) => {
        const endDate = this.eventForm.controls['endDate'];
        if (!endDate.value) {
          return;
        }

        const timeArray = value.split(':');
        const endHours = +timeArray[0];
        const endMinutes = +timeArray[1];

        const result = moment(endDate.value)
          .set({
            hour: endHours,
            minute: endMinutes,
            second: 0,
            millisecond: 0
          })
          .format();

        this.eventForm.controls['end'].setValue(result, {
          emitEvent: false
        });
      }
    );
  }

  ngOnDestroy() {
    try {
      this.routeSub.unsubscribe();
      this.eventSub.unsubscribe();
      this.userSub.unsubscribe();
    } catch (error) {}
  }
  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.eventForm.dirty) {
      return confirm(
        'Вы не сохранили изменения в событии. Всё равно покинуть страницу?'
      );
    } else {
      return true;
    }
  }

  onSubmit() {
    this.eventAdding = true;
    console.log('onSubmit');

    const publicationDate = firestore.FieldValue.serverTimestamp();
    const authorId = this.user.uid;
    /*
    const start = this.formatDate(
      this.eventForm.controls['startDate'].value,
      this.eventForm.controls['startTime'].value
    );

    const end = this.formatDate(
      this.eventForm.controls['endDate'].value,
      this.eventForm.controls['endTime'].value
    ); */

    const formData = this.eventForm.value;
    delete formData['startDate'];
    delete formData['startTime'];
    delete formData['endDate'];
    delete formData['endTime'];

    const event = {
      ...formData,

      publicationDate,
      authorId
    };

    console.log(event);

    this.events.update(this.id, event).then(doc => {
      this.eventAdding = false;
      this.eventAdded = true;
      this.eventForm.reset();
    });
  }

  createAgain() {
    this.eventAdded = false;
    this.eventForm.reset();
  }

  /*   formatDate(date, time) {
    const dateFormatted = format(new Date(date), 'YYYY-MM-DD');
    const timeFormatted = time;

    const result = format(
      new Date(dateFormatted + ' ' + timeFormatted),
      'YYYY-MM-DDTHH:mm:ss.SSSZ'
    );
    return result;
    // return new Date(date).toLocaleString();
  } */
}
