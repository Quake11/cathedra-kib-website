import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/core/services/news.service';
import { News } from 'src/app/models/news.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news$: Observable<Array<News>>;

  constructor(private news: NewsService) {}

  ngOnInit() {
    this.news$ = this.news.fetch();
  }
}
