import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from './auth.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnInit {
  // push notifications
  collection = 'notifications';

  constructor(
    private db: AngularFirestore,
    private afMessaging: AngularFireMessaging,
    private auth: AuthService,
    private users: UsersService
  ) {}

  ngOnInit() {}

  requestPermission(user: User) {
    console.log('requestPermission');

    this.afMessaging.requestToken.subscribe(
      token => {
        return this.saveTokenToDb(user, token);
      },
      error => {
        console.error(error);
      }
    );
  }

  // saving firebase cloud messaging token for user
  saveTokenToDb(user: User, token): Promise<void> {
    if (!user || !token) {
      return;
    }

    if (!user.fcmTokens || user.fcmTokens.length === 0) {
      return this.users.update(user.uid, { fcmTokens: [token] });
    }

    if (user.fcmTokens && user.fcmTokens.length > 0) {
      return this.users.update(user.uid, {
        fcmTokens: firestore.FieldValue.arrayUnion(token)
      });
    }
  }

  // receiving push messages in app
  receiveMessages() {
    return this.afMessaging.messages.pipe(
      map(message => {
        console.log('Received message!', message);
        return message;
      })
    );
  }

  hasTokenLocal(): Observable<boolean> {
    return this.afMessaging.getToken.pipe(
      map(token => {
        console.log(token);
        return !!token;
      })
    );
  }
  /*
  hasTokensInDb$(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => {
        if (!user || !user.fcmTokens) {
          return false;
        }
        console.log(user.fcmTokens);
        return user.fcmTokens.length > 0;
      })
    );
  } */

  tokensInDb(): Observable<Array<string>> {
    return this.auth.user$.pipe(
      map(user => {
        if (!user || !user.fcmTokens) {
          return null;
        }
        console.log(user, user.fcmTokens);
        return user.fcmTokens;
      })
    );
  }

  isDeviceTokenSaved(): Observable<boolean> {
    return forkJoin(this.afMessaging.getToken, this.tokensInDb()).pipe(
      map(([token, tokensInDb]) => {
        console.log(token, tokensInDb);

        return tokensInDb.includes(token);
      })
    );
  }

  add(user: User, notificationType: string): Promise<any> {
    if (!user || !notificationType) {
      return;
    }

    this.requestPermission(user);

    return this.db
      .collection(this.collection)
      .doc(user.uid)
      .set({
        [notificationType]: true
      })
      .then(() => {
        console.log('subbed to ' + notificationType);
      })
      .catch(error => console.error(error));
  }

  remove(userId: string, notificationType: string): Promise<any> {
    if (!userId || !notificationType) {
      return;
    }

    return this.db
      .collection(this.collection)
      .doc(userId)
      .set({
        [notificationType]: false
      })
      .then(() => {
        console.log('unsubbed from ' + notificationType);
      })
      .catch(error => console.error(error));
  }

  isSubbed(userId: string, notificationType: string): Observable<boolean> {
    if (!userId || !notificationType) {
      return of(false);
    }

    return this.db
      .collection(this.collection)
      .doc(userId)
      .valueChanges()
      .pipe(
        map(subscriptions => {
          if (!subscriptions) {
            return false;
          }
          return subscriptions[notificationType];
        })
      );
  }
}
