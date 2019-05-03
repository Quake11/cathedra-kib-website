export interface News {
  id?: string;
  authorId: string;
  authorName?: string; // for saving author name if account with associated Id will be deleted
  title: string;
  announcement: string;
  body: string;
  publicationDate: firebase.firestore.Timestamp;
  editDate?: firebase.firestore.Timestamp;
  editAuthorId?: string;
  editAuthorName?: string;
  deleted?: boolean;
}
