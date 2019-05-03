import { UsersService } from 'src/app/core/services/users.service';
import { News } from 'src/app/models/news.interface';
import { NewsService } from 'src/app/core/services/news.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  idSub: Subscription;
  newsSub: Subscription;
  authorSub: Subscription;
  editAuthorSub: Subscription;

  detailNews$: Observable<News>;

  newsData: News;
  authorData: User;
  editAuthorData: User;

  constructor(
    private route: ActivatedRoute,
    private news: NewsService,
    private users: UsersService,
    private ref: ChangeDetectorRef,
    private utils: UtilsService,
    public mediaObserver: MediaObserver
  ) {
    mediaObserver.media$.subscribe(() => this.ref.markForCheck());

    this.idSub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.detailNews$ = this.news.getById(id);
    });

    this.newsSub = this.detailNews$.subscribe(newsData => {
      this.newsData = newsData;
      this.ref.markForCheck();
      if (!newsData.authorId) {
        return;
      }

      this.authorSub = this.users
        .getData(newsData.authorId)
        .subscribe(userData => {
          // console.log(userData);

          this.authorData = userData;
          this.ref.markForCheck();
        });

      this.ref.markForCheck();
      if (!newsData.editAuthorId) {
        return;
      }

      this.editAuthorSub = this.users
        .getData(newsData.editAuthorId)
        .subscribe(userData => {
          this.editAuthorData = userData;
          this.ref.markForCheck();
        });
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }

    if (this.editAuthorSub) {
      this.editAuthorSub.unsubscribe();
    }
  }

  getDate(timestamp: firebase.firestore.Timestamp): string {
    return this.utils.getDateWithoutTime(timestamp);
  }

  getDateWithTime(timestamp: firebase.firestore.Timestamp): string {
    return this.utils.getDate(timestamp);
  }

  editedTooltip(): string {
    if (!this.newsData.editDate) {
      return;
    }

    if (!this.newsData.editAuthorId) {
      return `Отредактировано ${this.getDateWithTime(this.newsData.editDate)}`;
    }

    return `Отредактировано ${this.getDateWithTime(
      this.newsData.editDate
    )} by ${this.editAuthorData.displayName}`;
  }

  getUserName(user: User) {
    return this.users.formatName(user);
  }
}
