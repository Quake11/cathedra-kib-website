import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from 'src/app/models/group.interface';
import { MatSnackBar } from '@angular/material';
import { Exam } from 'src/app/models/exam.interface';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  collection = 'exams';

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  fetch(): Observable<Array<Exam>> {
    return this.db
      .collection<Exam>(this.collection)
      .snapshotChanges()
      .pipe(
        map(exams => {
          return exams.map(exam => {
            const data = exam.payload.doc.data() as Exam;
            const uid = exam.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }

  fetchForGroup(groupId: string): Observable<Array<Exam>> {
    return this.db
      .collection<Exam>(this.collection, ref =>
        ref.where('group', '==', groupId)
      )
      .valueChanges();
  }

  add(exam: Exam): Promise<any> {
    return this.db.collection(this.collection).add({
      ...exam
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
          const snackBarRef = this.snackBar.open('Экзамен удален', 'Отменить', {
            duration: 10000
          });

          snackBarRef.onAction().subscribe(() => this.markDeleted(id, false));
        }
      });
  }

  update(id, examData): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .update(examData);
  }

  getById(id: string): Observable<Exam> {
    return this.db
      .collection(this.collection)
      .doc<Exam>(id)
      .valueChanges();
  }
}
