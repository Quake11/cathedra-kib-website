import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from 'src/app/models/group.interface';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  collection = 'groups';

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  fetch(): Observable<Array<Group>> {
    return this.db
      .collection<Group>(this.collection, ref => ref.orderBy('name', 'asc'))
      .snapshotChanges()
      .pipe(
        map(groups => {
          return groups
            .filter(n => {
              const data = n.payload.doc.data() as Group;
              return data.deleted !== true;
            })
            .map(group => {
              const data = group.payload.doc.data() as Group;
              const uid = group.payload.doc.id;
              return { uid, ...data };
            });
        })
      );
  }

  add(group): Promise<any> {
    return this.db.collection(this.collection).add({
      ...group
    });
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
          const snackBarRef = this.snackBar.open('Группа удалена', 'Отменить', {
            duration: 10000
          });

          snackBarRef.onAction().subscribe(() => this.markDeleted(id, false));
        }
      });
  }

  update(id, groupData): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .update(groupData);
  }

  getById(id: string): Observable<Group> {
    return this.db
      .collection(this.collection)
      .doc<Group>(id)
      .valueChanges();
  }
}
