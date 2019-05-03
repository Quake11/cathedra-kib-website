import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { News } from 'src/app/models/news.interface';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input()
  item: News;

  @Input()
  fake: boolean;

  constructor(private utils: UtilsService) {}

  ngOnInit() {}

  getDate(timestamp: firebase.firestore.Timestamp) {
    return this.utils.getDateWithoutTime(timestamp);
  }
}
