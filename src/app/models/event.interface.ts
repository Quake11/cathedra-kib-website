export interface CathedraEvent {
  uid: string;
  title: string;
  authorId: string;
  description?: string;
  publicationDate: string;
  start: Date;
  end?: Date;

  startDate?: any;
  startTime?: string;
  endDate?: any;
  endTime?: string;

  color?: any; // EventColor
  allDay?: boolean;

  deleted?: boolean;
}
