import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { News } from 'src/app/models/news.interface';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('250ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))])
    ])
  ]
})
export class NewsListComponent implements OnInit {
  @Input()
  news: Array<News>;

  @Input()
  fakeItems: number;

  constructor() {}

  ngOnInit() {}

  createArray(number) {
    return Array.from({ length: number }, (x, i) => i);
  }
}
