import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  sending: boolean;
  sent: boolean;

  @Output()
  success = new EventEmitter<boolean>();

  constructor(private db: AngularFirestore) {}

  ngOnInit() {}

  async submitFeedbackForm(feedbackForm: {
    name: string;
    contact: string;
    question: string;
  }) {
    this.sending = true;

    const sendDate = firestore.FieldValue.serverTimestamp();
    await this.db.collection('feedback').add({ ...feedbackForm, sendDate });
    this.sent = true;
    this.sending = false;
    this.success.emit(true);
  }

  reset() {
    this.sent = false;
    this.sending = false;
    this.success.emit(false);
  }
}
