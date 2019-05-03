import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsGroupComponent } from './exams-group.component';

describe('ExamsGroupComponent', () => {
  let component: ExamsGroupComponent;
  let fixture: ComponentFixture<ExamsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
