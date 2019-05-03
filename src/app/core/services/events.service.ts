import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CathedraEvent } from 'src/app/models/event.interface';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  collection = 'events';

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  fetch(): Observable<Array<CathedraEvent>> {
    return this.db
      .collection(this.collection, ref =>
        ref.orderBy('publicationDate', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(items => {
          // console.log(items);

          let newItems: Array<CathedraEvent> = [];

          newItems = items
            .filter(n => {
              const data = n.payload.doc.data() as CathedraEvent;
              return data.deleted !== true;
            })
            .map(item => {
              const data = item.payload.doc.data() as CathedraEvent;
              const id = item.payload.doc.id;

              return { ...data, id } as CathedraEvent;
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
            'Событие удалено',
            'Отменить',
            {
              duration: 10000
            }
          );

          snackBarRef.onAction().subscribe(() => this.markDeleted(id, false));
        }
      });
  }

  getById(id: string): Observable<CathedraEvent> {
    return this.db
      .collection(this.collection)
      .doc<CathedraEvent>(id)
      .valueChanges();
  }
}
