export interface Exam {
  uid?: string;
  subject: string;
  type: 'exam' | 'zachet' | 'courseWork' | 'practice';
  group: string;
  date?: string;
}
