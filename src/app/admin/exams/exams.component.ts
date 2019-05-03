import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { Observable } from 'rxjs';

import { GroupsService } from 'src/app/core/services/groups.service';
import { Group } from 'src/app/models/group.interface';
import { ExamsService } from 'src/app/core/services/exams.service';
import { Exam } from 'src/app/models/exam.interface';
import { trigger, transition, style, animate } from '@angular/animations';
const moment = _moment;

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
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
export class ExamsComponent implements OnInit {
  form: FormGroup;

  groups$: Observable<Array<Group>>;
  exams$: Observable<Array<Exam>>;

  sending: boolean;
  error: string;

  types = {
    exam: 'Экзамен',
    zachet: 'Зачёт',
    courseWork: 'Курсовая',
    practice: 'Практика'
  };

  constructor(
    private groups: GroupsService,
    private fb: FormBuilder,
    private exams: ExamsService
  ) {}

  ngOnInit() {
    this.exams$ = this.exams.fetch();
    this.groups$ = this.groups.fetch();

    this.form = this.fb.group({
      subject: ['', [Validators.required]],
      type: ['', [Validators.required]],
      group: ['', [Validators.required]],
      date: ['']
    });

    this.form.controls['date'].valueChanges.subscribe((value: Date) => {
      const result = moment.utc(value).utcOffset(180);

      this.form.controls['date'].setValue(result.format(), {
        emitEvent: false
      });
    });
  }

  onSubmit() {
    this.sending = true;
    this.exams
      .add(this.form.value)
      .then(() => {
        this.resetForm();
      })
      .catch(error => {
        console.log(error);
        this.error = error;
        this.sending = false;
      });
  }

  resetForm() {
    this.form.reset();
    this.error = null;
    this.sending = false;
  }

  resetError() {
    this.error = null;
  }

  trackById(index, item: Exam) {
    return item.uid ? item.uid : item;
  }
}
