import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathedraComponent } from './cathedra.component';

describe('CathedraComponent', () => {
  let component: CathedraComponent;
  let fixture: ComponentFixture<CathedraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathedraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathedraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
