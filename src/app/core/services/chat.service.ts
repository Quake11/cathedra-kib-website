import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  collection = 'news';

  constructor(private db: AngularFirestore) {}

  /* fetchChats(): Observable<Array<Chat>> {
    return this.db
      .collection(this.collection, ref =>
        ref.orderBy('publicationDate', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(items => {
          let newItems: Array<News> = [];

          newItems = items.map(item => {
            const data = item.payload.doc.data() as News;
            const id = item.payload.doc.id;
            return { ...data, id } as News;
          });

          return newItems;
        })
      );
  } */

  addNews(news): Promise<any> {
    return this.db.collection(this.collection).add({
      ...news
    });
  }

  deleteNews(id: string): Promise<any> {
    return this.db
      .collection(this.collection)
      .doc(id)
      .delete();
  }

  editNews(id, newsData): Promise<any> {
    return this.db
      .collection('news')
      .doc(id)
      .update(newsData);
  }

/*   getNewsById(id: string): Observable<News> {
    return this.db
      .collection('news')
      .doc<News>(id)
      .valueChanges();
  } */
}
