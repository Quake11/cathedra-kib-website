import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Schedule } from 'src/app/models/schedule.interface';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {
  @Input()
  item: Schedule;

  fileUrl: string;

  editAuthorSub: Subscription;
  editAuthorData: User;

  constructor(private utils: UtilsService, private users: UsersService) {}

  ngOnInit() {
    this.getUrl();

    if (this.item.editAuthorId) {
      this.editAuthorSub = this.users
        .getData(this.item.editAuthorId)
        .subscribe(userData => {
          this.editAuthorData = userData;
        });
    }
  }

  getDate(timestamp: firebase.firestore.Timestamp) {
    return this.utils.getDateWithoutTime(timestamp);
  }

  getDateWithTime(timestamp: firebase.firestore.Timestamp) {
    if (timestamp) {
      return this.utils.getDate(timestamp);
    }
  }

  getUrl() {
    this.utils
      .getFileDownloadUrl(this.item.filePath)
      .subscribe(url => (this.fileUrl = url));
  }

  editedTooltip(): string {
    if (!this.item.editDate) {
      return;
    }

    if (!this.item.editAuthorId) {
      return `Отредактировано ${this.getDateWithTime(this.item.editDate)}`;
    }

    return `Отредактировано ${this.getDateWithTime(this.item.editDate)} by  ${
      this.editAuthorData.displayName
    }`;
  }
}
