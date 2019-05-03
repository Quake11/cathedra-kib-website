import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { firestore } from 'firebase/app';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/core/services/events.service';
import { User } from 'src/app/models/user.interface';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  eventForm: FormGroup;

  eventAdding = false;
  eventAdded = false;

  addedEventId: string;

  user: User;
  userSub: Subscription;

  constructor(
    private events: EventsService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.userSub = this.auth.user$.subscribe(user => (this.user = user));
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endDate: [''],
      endTime: [''],
      start: [''],
      end: [''],
      description: [''],
      color: [''],
      allDay: [false]
    });
  }

  ngOnInit() {
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

  getTimeArray(timeValue) {
    const timeArray = timeValue.split(':');
    const hours = timeArray[0] - 3;
    const minutes = timeArray[1];

    return [hours, minutes];
  }

  updateTime(control: AbstractControl, hours, minutes) {
    control.value.setUTCHours(hours);
    control.value.setUTCMinutes(minutes);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.eventForm.dirty) {
      return confirm(
        'Вы не опубликовали событие. Всё равно покинуть страницу?'
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

    this.events.add(event).then(doc => {
      this.addedEventId = doc.id;

      this.eventAdding = false;
      this.eventAdded = true;
      this.eventForm.reset();
    });
  }

  createAgain() {
    this.eventAdded = false;
    this.eventForm.reset();
  }
}
