import { AuthService } from 'src/app/core/services/auth.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';
import { Subscription, Observable, empty } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.interface';
import { User } from 'src/app/models/user.interface';
import { switchMap } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  id: string;

  editableSchedule$: Observable<Schedule>;

  metadata = { type: 'schedule' };
  collection = 'schedule';
  uploadFolder = 'schedule';
  dropzoneTitle = 'Перетащите файл с расписанием сюда';

  scheduleForm: FormGroup;
  title: AbstractControl;
  description: AbstractControl;

  scheduleEditing = false;
  scheduleEdited = false;

  user: User;
  userSub: Subscription;

  uploadedFilePath: string;
  uploadedFileName: string;
  uploadedFileUrl: string;

  routeSub: Subscription;
  scheduleSub: Subscription;

  author$: Observable<User>;

  url$: Observable<string>; // file download url

  deleting: boolean; // is file being deleted right now

  fileChanged: boolean;

  loaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private schedule: ScheduleService,
    private users: UsersService,
    private utils: UtilsService,
    private auth: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(user => (this.user = user));

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.editableSchedule$ = this.schedule.getById(this.id);
    });

    this.scheduleForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.title = this.scheduleForm.controls.title;
    this.description = this.scheduleForm.controls.description;

    this.author$ = this.editableSchedule$.pipe(
      switchMap(scheduleObject => {
        if (scheduleObject.authorId) {
          console.log('ok');

          return this.users.getData(scheduleObject.authorId);
        } else {
          return empty();
        }
      })
    );

    this.scheduleSub = this.editableSchedule$.subscribe(
      (scheduleObject: Schedule) => {
        console.log(scheduleObject);

        this.scheduleForm.setValue({
          title: scheduleObject.title,
          description: scheduleObject.description
        });

        this.uploadedFilePath = scheduleObject.filePath;
        this.uploadedFileName = scheduleObject.fileName;

        if (scheduleObject.filePath) {
          this.url$ = this.getScheduleFileUrl(scheduleObject.filePath);

          this.url$.subscribe(url => {
            this.uploadedFileUrl = url;
          });
        }
        this.loaded = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.scheduleSub) {
      this.scheduleSub.unsubscribe();
    }
  }

  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.scheduleForm.dirty) {
      if (
        confirm(
          'Вы не сохранили внесённые изменения. Всё равно покинуть страницу?'
        )
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  onSubmit() {
    this.scheduleEditing = true;
    console.log('onSubmit');

    const title = this.title.value;
    const description = this.description.value;

    const editDate = firestore.FieldValue.serverTimestamp();
    const editAuthorId = this.user.uid;
    const filePath = this.uploadedFilePath;
    const fileName = this.uploadedFileName;

    const scheduleData = {
      title,
      description,
      editDate,
      editAuthorId,
      filePath,
      fileName
    } as Schedule;

    this.schedule.update(this.id, scheduleData).then(doc => {
      this.scheduleEditing = false;
      this.scheduleEdited = true;

      this.scheduleForm.reset();

      // this.resetUploadedFileData();
    });
  }

  onUploadedFileData(fileData): void {
    this.fileChanged = true;
    this.uploadedFilePath = fileData.filePath;
    this.uploadedFileName = fileData.fileName;

    this.utils
      .getFileDownloadUrl(this.uploadedFilePath)
      .subscribe(url => (this.uploadedFileUrl = url));
  }

  onDeletedFile() {
    this.schedule
      .set(
        this.id,
        {
          fileName: null,
          filePath: null
        },
        true
      )
      .then(() => this.resetUploadedFileData())
      .catch(error => console.log(error));
  }
  /*
  deleteUploadedFile(): void {
    if (this.uploadedFilePath) {
      this.deleting = true;
      this.utils.deleteFile(this.uploadedFilePath).subscribe(() => {
        this.resetUploadedFileData();
        this.deleting = false;
        this.fileChanged = true;
        this.cdRef.detectChanges();
      });
    }
  } */

  resetUploadedFileData() {
    this.uploadedFileName = null;
    this.uploadedFilePath = null;
    this.uploadedFileUrl = null;
  }

  addScheduleAgain(): void {
    this.scheduleEdited = false;
    this.scheduleForm.reset();
  }

  getScheduleFileUrl(filePath) {
    return this.utils.getFileDownloadUrl(filePath);
  }
}
