import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private basicFontSize = 14;
  messageToastChange: Subject<Object> = new Subject<Object>();

  roles = {
    admin: 'Администратор',
    editor: 'Редактор',
    teacher: 'Преподаватель',
    student: 'Студент'
  };

  public fontSize: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.basicFontSize
  );

  constructor(
    public mediaObserver: MediaObserver,
    private storage: AngularFireStorage
  ) {}

  addSingleToast(message: Object) {
    this.messageToastChange.next(message);
  }

  changeFontSize(size: number) {
    this.fontSize.next(size);
  }

  public isSmallScreen(): boolean {
    return (
      this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm')
    );
  }

  deleteFile(path): Observable<any> {
    return this.storage.ref(path).delete();
  }

  getFileDownloadUrl(path): Observable<string> {
    return this.storage
      .ref(path)
      .getDownloadURL()
      .pipe(
        catchError(error => {
          throw this.errorHandler(error);
        })
      );
  }

  errorHandler(error: any): void {
    console.log(error);
  }

  getDate(timestamp: firebase.firestore.Timestamp): string {
    const date = timestamp.toDate();
    return date.toLocaleString();
  }

  getDateWithoutTime(timestamp: firebase.firestore.Timestamp): string {
    const date = timestamp.toDate();
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  guid() {
    const s4 = (): string => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return 'ss-s-s-s-sss'.replace(/s/g, s4);
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  getRoleName(role: string) {
    return this.roles[role] ? this.roles[role] : role;
  }

  isValidDate(d: any) {
    return !isNaN(d) && d instanceof Date;
  }

  getWeekDay(date) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return days[date.getDay()];
  }
}
