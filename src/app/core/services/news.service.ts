import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.interface';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  collection = 'news';

  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  fetch(): Observable<Array<News>> {
    return this.db
      .collection(this.collection, ref =>
        ref.orderBy('publicationDate', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(items => {
          let newItems: Array<News> = [];

          newItems = items
            .filter(n => {
              const data = n.payload.doc.data() as News;
              return data.deleted !== true;
            })
            .map(item => {
              const data = item.payload.doc.data() as News;
              const id = item.payload.doc.id;
              return { ...data, id } as News;
            });

          return newItems;
        })
      );
  }

  add(news): Promise<any> {
    return this.db.collection(this.collection).add({
      ...news
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
          const snackBarRef = this.snackBar.open(
            'Новость удалена',
            'Отменить',
            {
              duration: 10000
            }
          );

          snackBarRef.onAction().subscribe(() => this.markDeleted(id, false));
        }
      });
  }

  edit(id, newsData): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .update(newsData);
  }

  getById(id: string): Observable<News> {
    return this.db
      .collection(this.collection)
      .doc<News>(id)
      .valueChanges();
  }
}
