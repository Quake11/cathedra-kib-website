import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
  AngularFireStorageReference
} from '@angular/fire/storage';
import { Observable, Subscription, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../core/services/utils.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  @Input()
  metadata: any;

  @Input()
  uploadFolder: string;

  @Input()
  dropzoneTitle: string;

  // if file is already uploaded, take name from db
  @Input()
  uploadedFileName: string;

  @Input()
  uploadedFilePath: string;

  @Input()
  uploadedFileUrl: string;

  @Output()
  uploaded = new EventEmitter<any>();

  @Output()
  uploading = new EventEmitter<boolean>();

  @Output()
  deleted = new EventEmitter<true>();

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage$: Observable<number>;

  //  snapshot$: Observable<any>;

  // Download URL
  downloadUrl$: Observable<string>;

  downloadUrlSub: Subscription;

  // State for dropzone CSS toggling
  isHovering: boolean;

  fileName: string;
  filePath: string;
  fileRef: AngularFireStorageReference;

  constructor(
    private storage: AngularFireStorage,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    if (this.uploadedFilePath && this.uploadedFileName) {
      this.fileName = this.uploadedFileName;
      this.filePath = this.uploadedFilePath;

      this.fileRef = this.storage.ref(this.filePath);
      this.downloadUrl$ = this.fileRef.getDownloadURL();
    } else if (this.uploadedFileUrl) {
      this.downloadUrl$ = of(this.uploadedFileUrl);
    }
  }

  ngOnDestroy() {
    if (this.downloadUrlSub) {
      this.downloadUrlSub.unsubscribe();
    }
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  async startUpload(event: FileList) {
    this.uploading.emit(true);
    // The File object
    const file = event.item(0);
    this.fileName = file.name;

    // The storage path
    this.filePath = `${this.uploadFolder}/${this.utils.guid()}/${
      this.fileName
    }`;
    this.fileRef = this.storage.ref(this.filePath);

    // The main task
    if (this.metadata) {
      this.task = this.storage.upload(this.filePath, file, {
        customMetadata: this.metadata
      });
    } else {
      this.task = this.storage.upload(this.filePath, file);
    }

    // Progress monitoring
    this.percentage$ = this.task.percentageChanges();

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadUrl$ = this.fileRef.getDownloadURL();
          this.uploading.emit(false);
          this.emitUploadedEvent();
        })
      )
      .subscribe();
  }

  deleteUploadedFile(): any {
    try {
      this.utils.deleteFile(this.filePath).subscribe(() => {
        this.reset();
        this.deleted.emit(true);
      });
    } catch (error) {
      console.log(error);
      this.deleted.emit(true);
    }
  }

  reset() {
    this.filePath = null;
    this.fileRef = null;
    this.fileName = null;
    this.downloadUrl$ = null;
    this.emitUploadedEvent();
  }

  emitUploadedEvent() {
    if (!this.downloadUrl$) {
      return;
    }
    this.downloadUrlSub = this.downloadUrl$.subscribe(url => {
      this.uploaded.emit({
        filePath: this.filePath,
        fileName: this.fileName,
        url
      });
    });
  }
}
