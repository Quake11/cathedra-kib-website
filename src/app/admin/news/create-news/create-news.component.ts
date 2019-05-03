import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { User } from 'src/app/models/user.interface';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { firestore } from 'firebase/app';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  newsForm: FormGroup;

  title: AbstractControl;
  announcement: AbstractControl;
  body: AbstractControl;
  anonymous: AbstractControl;

  newsAdding = false;
  newsAdded = false;

  addedNewsId: string;

  user: User;
  userSub: Subscription;

  constructor(
    private news: NewsService,
    private fb: FormBuilder,
    private auth: AuthService,
    private users: UsersService
  ) {
    this.userSub = this.auth.user$.subscribe(user => (this.user = user));
    this.newsForm = this.fb.group({
      title: ['', [Validators.required]],
      announcement: ['', [Validators.required]],
      body: ['', [Validators.required]],
      anonymous: [false]
    });

    this.title = this.newsForm.controls.title;
    this.announcement = this.newsForm.controls.announcement;
    this.body = this.newsForm.controls.body;
    this.anonymous = this.newsForm.controls.anonymous;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.newsForm.dirty) {
      return confirm(
        'Вы не опубликовали новость. Всё равно покинуть страницу?'
      );
    } else {
      return true;
    }
  }

  onSubmit() {
    this.newsAdding = true;
    console.log('onSubmit');

    const title = this.title.value;
    const announcement = this.announcement.value;
    const body = this.body.value;
    const anonymous = this.anonymous.value;
    const publicationDate = firestore.FieldValue.serverTimestamp();
    const authorId = this.user.uid;
    const authorName = this.users.formatName(this.user);

    const newsData = {
      title,
      announcement,
      body,
      publicationDate,
      authorId,
      authorName
    };
    if (anonymous) {
      delete newsData.authorId;
    }
    this.news.add(newsData).then(doc => {
      this.addedNewsId = doc.id;
      this.newsAdding = false;
      this.newsAdded = true;
      this.newsForm.reset();
    });
  }

  addNewsAgain() {
    this.newsAdded = false;
    this.newsForm.reset();
  }
}
