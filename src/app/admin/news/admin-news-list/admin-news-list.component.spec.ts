import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsListComponent } from './admin-news-list.component';

describe('AdminNewsListComponent', () => {
  let component: AdminNewsListComponent;
  let fixture: ComponentFixture<AdminNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
