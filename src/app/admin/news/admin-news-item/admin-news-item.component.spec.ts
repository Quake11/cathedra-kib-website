import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsItemComponent } from './admin-news-item.component';

describe('AdminNewsItemComponent', () => {
  let component: AdminNewsItemComponent;
  let fixture: ComponentFixture<AdminNewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
