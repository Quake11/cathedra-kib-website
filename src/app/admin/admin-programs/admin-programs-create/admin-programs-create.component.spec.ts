import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramsCreateComponent } from './admin-programs-create.component';

describe('AdminProgramsCreateComponent', () => {
  let component: AdminProgramsCreateComponent;
  let fixture: ComponentFixture<AdminProgramsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProgramsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
