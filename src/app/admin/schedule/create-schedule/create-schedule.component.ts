import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { firestore } from 'firebase/app';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';
import { Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Schedule } from 'src/app/models/schedule.interface';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  metadata = { type: 'schedule' };
  collection = 'schedule';
  uploadFolder = 'schedule';
  dropzoneTitle = 'Перетащите файл с расписанием сюда';

  scheduleForm: FormGroup;
  title: AbstractControl;
  description: AbstractControl;

  scheduleAdding = false;
  scheduleAdded = false;

  addedScheduleId: string;

  user: User;
  userSub: Subscription;

  uploadedFilePath: string;
  uploadedFileName: string;

  constructor(
    private fb: FormBuilder,
    private schedule: ScheduleService,
    private auth: AuthService,
    private utils: UtilsService
  ) {
    this.userSub = this.auth.user$.subscribe(user => (this.user = user));
    this.initForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.scheduleForm.dirty ||
      (!this.scheduleAdded && this.uploadedFilePath)
    ) {
      if (
        confirm('Вы не опубликовали расписание. Всё равно покинуть страницу?')
      ) {
        // this.deleteUploadedFile();
        this.utils.deleteFile(this.uploadedFilePath);
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  initForm() {
    this.scheduleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.title = this.scheduleForm.controls.title;
    this.description = this.scheduleForm.controls.description;
  }

  onSubmit() {
    this.scheduleAdding = true;
    console.log('onSubmit');

    const title = this.title.value;
    const description = this.description.value;

    const publicationDate = firestore.FieldValue.serverTimestamp();
    const authorId = this.user.uid;
    const filePath = this.uploadedFilePath;
    const fileName = this.uploadedFileName;

    const schedule = {
      title,
      description,
      publicationDate,
      authorId,
      filePath,
      fileName
    } as Schedule;

    this.schedule.add(schedule).then(doc => {
      this.addedScheduleId = doc.id;

      this.scheduleAdding = false;
      this.scheduleAdded = true;
      this.scheduleForm.reset();
    });
  }

  addScheduleAgain(): void {
    this.scheduleAdded = false;
    this.scheduleForm.reset();
  }

  onUploadedFileData(fileData): void {
    console.log(fileData);
    this.uploadedFilePath = fileData.filePath;
    this.uploadedFileName = fileData.fileName;
  }
}
