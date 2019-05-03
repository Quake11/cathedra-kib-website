import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Group } from 'src/app/models/group.interface';
import { ExamsService } from 'src/app/core/services/exams.service';
import { Exam } from 'src/app/models/exam.interface';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-exams-group',
  templateUrl: './exams-group.component.html',
  styleUrls: ['./exams-group.component.scss']
})
export class ExamsGroupComponent implements OnInit, OnDestroy {
  @Input()
  group: Group;

  exams$: Observable<Array<Exam>>;

  examsList = {
    exam: [],
    zachet: [],
    courseWork: [],
    practice: []
  };

  notEmpty: boolean;

  sub: Subscription;

  constructor(private exams: ExamsService, private utils: UtilsService) {}

  pushExam(exam: Exam) {
    this.examsList[exam.type].push(exam);
    this.notEmpty = true;
  }

  ngOnInit() {
    this.exams$ = this.exams.fetchForGroup(this.group.uid);

    this.sub = this.exams$.subscribe(exams => {
      this.examsList = {
        exam: [],
        zachet: [],
        courseWork: [],
        practice: []
      };
      this.notEmpty = false;
      exams.sort(this.compare).map(exam => {
        const date = new Date(exam.date);

        if (this.utils.isValidDate(date)) {
          const formattedDate =
            date.toLocaleDateString() + ' - ' + this.utils.getWeekDay(date);
          exam.date = formattedDate;
        } else {
          delete exam.date;
        }

        this.pushExam(exam);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  compare(a: Exam, b: Exam) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }
}
