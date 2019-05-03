import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.interface';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  collection = 'schedule';

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  fetch(): Observable<Array<Schedule>> {
    return this.db
      .collection(this.collection, ref =>
        ref.orderBy('publicationDate', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(items => {
          // console.log(items);

          let newItems: Array<Schedule> = [];

          newItems = items
            .filter(n => {
              const data = n.payload.doc.data() as Schedule;
              return data.deleted !== true;
            })
            .map(item => {
              const data = item.payload.doc.data() as Schedule;
              const id = item.payload.doc.id;

              return { ...data, id } as Schedule;
            });

          return newItems;
        })
      );
  }

  add(data): Promise<any> {
    return this.db.collection(this.collection).add({
      ...data
    });
  }

  update(id: string, data: any): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .update(data);
  }

  set(id: string, data: any, merge: boolean): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .set(data, { merge });
  }

  delete(id: string): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .delete();
  }

  markDeleted(id: string, deleted: boolean = true): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .update({ deleted })
      .then(() => {
        if (deleted) {
          const snackBarRef = this.snackBar.open(
            'Расписание удалено',
            'Отменить',
            {
              duration: 10000
            }
          );

          snackBarRef.onAction().subscribe(() => this.markDeleted(id, false));
        }
      });
  }

  getById(id: string): Observable<Schedule> {
    return this.db
      .collection(this.collection)
      .doc<Schedule>(id)
      .valueChanges();
  }
}
