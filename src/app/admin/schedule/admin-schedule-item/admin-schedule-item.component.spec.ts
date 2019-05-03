import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleItemComponent } from './admin-schedule-item.component';

describe('AdminScheduleItemComponent', () => {
  let component: AdminScheduleItemComponent;
  let fixture: ComponentFixture<AdminScheduleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScheduleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
