import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  collection = 'users';
  constructor(private afs: AngularFirestore) {}

  get(id: string): AngularFirestoreDocument<User> {
    return this.afs.collection(this.collection).doc(id);
  }

  fetch(): Observable<Array<User>> {
    return this.afs.collection<User>(this.collection).valueChanges();
  }

  fetchCountForGroup(groupId: string): Observable<number> {
    return this.afs
      .collection<User>(this.collection, ref =>
        ref.where('group', '==', groupId).where('confirmed', '==', true)
      )
      .valueChanges()
      .pipe(map(students => (students ? students.length : 0)));
  }

  getData(id: string): Observable<User> {
    return this.afs
      .collection(this.collection)
      .doc<User>(id)
      .valueChanges();
  }

  update(id: string, data: any) {
    return this.afs
      .collection(this.collection)
      .doc(id)
      .update(data);
  }

  updateRole(id: string, role: string, add: boolean) {
    if (add) {
      return this.afs
        .collection(this.collection)
        .doc(id)
        .update({ [`roles.${role}`]: true });
    } else {
      return this.afs
        .collection(this.collection)
        .doc(id)
        .update({ [`roles.${role}`]: firestore.FieldValue.delete() });
    }
  }

  changeGroupConfirmed(userId: string, data: any) {
    console.log(data);
    return this.afs
      .collection(this.collection)
      .doc(userId)
      .update(data);
  }

  /*   userConfirmed(userId: string) {
    return this.afs
      .collection('confirmed')
      .doc(userId)
      .valueChanges();
  } */

  /*  getConfirmed(): Observable<Array<any>> {
    return this.afs
      .collection('confirmed')
      .snapshotChanges()
      .pipe(
        map(items => {
          let newItems: Array<any> = [];

          newItems = items.map(item => {
            const data = item.payload.doc.data();
            const uid = item.payload.doc.id;
            return { ...data, uid };
          });

          return newItems;
        })
      );
  }

  getAllUsersWithConfirmed(): Observable<any> {
    return combineLatest(this.getAll(), this.getConfirmed()).pipe(
      mergeMap(([users, confirmed]) => {
        const newUsers = Array.from(users);
        confirmed.forEach(confirm => {
          const i = newUsers.findIndex(u => u.uid === confirm.uid);
          newUsers[i].confirmed = confirm;
        });

        console.log(newUsers);

        return newUsers;
      })
    );
  } */

  formatName(userData): string {
    if (userData.firstname && userData.lastname && userData.middlename) {
      return `${userData.lastname} ${userData.firstname} ${
        userData.middlename
      }`;
    }

    if (userData.firstname && userData.lastname) {
      return `${userData.lastname} ${userData.firstname}`;
    }

    if (userData.firstname) {
      return userData.firstname;
    }

    if (userData.displayName) {
      return userData.displayName;
    }

    return null;
  }

  formatOnlyFirstname(userData) {
    return this.formatName({
      firstname: userData.firstname,
      displayName: userData.displayName
    });
  }
}
