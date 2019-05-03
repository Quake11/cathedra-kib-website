import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { firestore } from 'firebase/app';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewsService } from 'src/app/core/services/news.service';
import { UsersService } from 'src/app/core/services/users.service';
import { CanComponentDeactivate } from 'src/app/core/services/unsaved-changes.service';

import { News } from 'src/app/models/news.interface';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  id: string;
  routeSub: Subscription;
  newsSub: Subscription;
  editableNews$: Observable<News>;

  newsForm: FormGroup;

  title: AbstractControl;
  announcement: AbstractControl;
  body: AbstractControl;

  newsEditing = false;
  newsEdited = false;

  editedNewsId: string;

  author$: Observable<User>;

  user: User;
  userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private fb: FormBuilder,
    private users: UsersService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(user => (this.user = user));

    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.editableNews$ = this.newsService.getById(this.id);
    });

    this.author$ = this.editableNews$.pipe(
      switchMap(newsObject => {
        if (newsObject.authorId) {
          return this.users.getData(newsObject.authorId);
        } else {
          return empty();
        }
      })
    );

    this.newsSub = this.editableNews$.subscribe((newsObject: News) => {
      console.log(newsObject);

      this.newsForm.setValue({
        title: newsObject.title,
        announcement: newsObject.announcement,
        body: newsObject.body
      });
    });

    this.newsForm = this.fb.group({
      title: ['', [Validators.required]],
      announcement: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });

    this.title = this.newsForm.controls.title;
    this.announcement = this.newsForm.controls.announcement;
    this.body = this.newsForm.controls.body;
  }

  ngOnDestroy() {
    try {
      this.routeSub.unsubscribe();
      this.newsSub.unsubscribe();
      this.userSub.unsubscribe();
    } catch (error) {}
  }

  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.newsForm.dirty) {
      return confirm('Вы не сохранили изменения. Всё равно покинуть страницу?');
    } else {
      return true;
    }
  }

  onSubmit() {
    console.log(this.id);

    this.newsEditing = true;
    console.log('onSubmit');

    const title = this.title.value;
    const announcement = this.announcement.value;
    const body = this.body.value;
    const editDate = firestore.FieldValue.serverTimestamp();
    const editAuthorId = this.user.uid;
    const editAuthorName = this.users.formatName(this.user);

    const news = {
      title,
      announcement,
      body,
      editDate,
      editAuthorId,
      editAuthorName
    };
    this.updateNews(this.id, news).then(() => {
      this.newsEditing = false;
      this.newsEdited = true;

      this.newsForm.reset();
    });
  }

  updateNews(id, newsData): Promise<any> {
    return this.newsService.edit(id, newsData);
  }

  getName(user: User) {
    return this.users.formatName(user);
  }
}
