import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleListComponent } from './admin-schedule-list.component';

describe('AdminScheduleListComponent', () => {
  let component: AdminScheduleListComponent;
  let fixture: ComponentFixture<AdminScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
