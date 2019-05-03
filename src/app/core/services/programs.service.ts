import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { Program } from 'src/app/models/program.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  programsCollection = 'programs';
  skillsSubCollection = 'skills';

  constructor(private db: AngularFirestore) {}

  fetch(): Observable<Array<Program>> {
    return this.db
      .collection<Program>(this.programsCollection)
      .snapshotChanges()
      .pipe(
        map(programs => {
          return programs.map(program => {
            const data = program.payload.doc.data() as Program;
            const uid = program.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }

  getById(id: string): Observable<any> {
    return this.db
      .collection(this.programsCollection, ref =>
        ref.where('id', '==', id).limit(1)
      )
      .snapshotChanges()
      .pipe(
        switchMap(results => {
          if (results.length > 0) {
            const program = results[0].payload.doc.data() as Program;
            const uid = results[0].payload.doc.id;

            try {
              delete program['publicationDate'];
              delete program['editDate'];
            } catch (error) {
              console.log(error);
            }
            return of({ uid, ...program });
          }
        })
      );
  }

  add(program): Promise<any> {
    return this.db.collection(this.programsCollection).add({
      publicationDate: firestore.FieldValue.serverTimestamp(),
      ...program
    });
  }

  delete(id: string): Promise<any> {
    return this.db
      .collection(this.programsCollection)
      .doc(id)
      .delete();
  }

  update(uid: string, program: any): Promise<any> {
    return this.db
      .collection(this.programsCollection)
      .doc(uid)
      .update({
        editDate: firestore.FieldValue.serverTimestamp(),
        ...program
      });
  }
}
