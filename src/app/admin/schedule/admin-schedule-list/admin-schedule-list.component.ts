import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-schedule-list',
  templateUrl: './admin-schedule-list.component.html',
  styleUrls: ['./admin-schedule-list.component.scss']
})
export class AdminScheduleListComponent implements OnInit {
  schedules$: Observable<Array<Schedule>>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private schedule: ScheduleService
  ) {
    this.schedules$ = this.schedule.fetch();
  }

  ngOnInit() {}

  deleteSchedule(itemId, filePath): Promise<any> {
    return Promise.all([
      this.deleteFromDb(itemId),
      this.deleteFile(filePath)
    ]).then(() => {
      console.log('deleted');
    });
  }

  deleteFromDb(itemId): Promise<any> {
    return this.db
      .collection('schedule')
      .doc(itemId)
      .delete();
  }

  deleteFile(path): Observable<any> {
    return this.storage.ref(path).delete();
  }

  trackById(index, item: Schedule) {
    return item.id ? item.id : item;
  }
}
