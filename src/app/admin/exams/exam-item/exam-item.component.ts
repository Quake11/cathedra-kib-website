import { Component, OnInit, Input } from '@angular/core';
import { ExamsService } from 'src/app/core/services/exams.service';
import { Exam } from 'src/app/models/exam.interface';
import { GroupsService } from 'src/app/core/services/groups.service';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.interface';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-exam-item',
  templateUrl: './exam-item.component.html',
  styleUrls: ['./exam-item.component.scss']
})
export class ExamItemComponent implements OnInit {
  @Input()
  exam: Exam;

  group$: Observable<Group>;

  types = {
    exam: 'Экзамен',
    zachet: 'Зачёт',
    courseWork: 'Курсовая',
    practice: 'Практика'
  };

  progress = 0;

  formattedDate: string;

  constructor(
    private exams: ExamsService,
    private groups: GroupsService,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.group$ = this.groups.getById(this.exam.group);

    const formattedDate = new Date(this.exam.date);
    if (this.utils.isValidDate(formattedDate)) {
      this.formattedDate = formattedDate.toLocaleDateString();
    }
  }

  deleteExam(e, examId: string) {
    this.progress = e;
    if (this.progress >= 110) {
      this.exams.delete(examId);
      this.progress = 0;
    }
  }
}
