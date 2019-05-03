import { UtilsService } from 'src/app/core/services/utils.service';
import { NewsService } from 'src/app/core/services/news.service';
import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news.interface';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin-news-item',
  templateUrl: './admin-news-item.component.html',
  styleUrls: ['./admin-news-item.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0.5, transform: 'translateY(-10px)' }),
        animate('150ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0px)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ])
    ])
  ]
})
export class AdminNewsItemComponent implements OnInit {
  @Input()
  item: News;

  progress = 0;

  constructor(
    private news: NewsService,
    public dialog: MatDialog,
    private utils: UtilsService
  ) {}

  ngOnInit() {}

  getDate(timestamp: firebase.firestore.Timestamp) {
    return this.utils.getDate(timestamp);
  }

  deleteNews(e, id: string) {
    this.progress = e;
    // Not really, deleting. Marking as deleted
    if (this.progress >= 110) {
      this.news.markDeleted(id);
      this.progress = 0;
    }
  }
}
