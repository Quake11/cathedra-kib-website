import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventItemComponent } from './admin-event-item.component';

describe('AdminEventItemComponent', () => {
  let component: AdminEventItemComponent;
  let fixture: ComponentFixture<AdminEventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
