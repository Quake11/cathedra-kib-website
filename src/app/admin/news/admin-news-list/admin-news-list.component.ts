import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news.interface';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './admin-news-list.component.html',
  styleUrls: ['./admin-news-list.component.scss']
})
export class AdminNewsListComponent implements OnInit {
  news$: Observable<Array<News>>;

  constructor(private news: NewsService) {
    this.news$ = this.news.fetch();
  }
  ngOnInit() {}

  trackById(index, item: News) {
    return item.id ? item.id : item;
  }
}
