import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramsEditComponent } from './admin-programs-edit.component';

describe('AdminProgramsEditComponent', () => {
  let component: AdminProgramsEditComponent;
  let fixture: ComponentFixture<AdminProgramsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProgramsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
