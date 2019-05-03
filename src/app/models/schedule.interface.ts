export interface Schedule {
  id?: string;
  title: string;
  description: string;
  filePath: string;
  fileName: string;
  authorId: string;
  publicationDate: firebase.firestore.Timestamp;
  editAuthorId?: string;
  editDate?: firebase.firestore.Timestamp;
  deleted?: boolean;
}
