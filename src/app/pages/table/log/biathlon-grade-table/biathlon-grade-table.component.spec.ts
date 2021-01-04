import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiathlonGradeTableComponent } from './biathlon-grade-table.component';

describe('GoodsTypeComponent', () => {
  let component: BiathlonGradeTableComponent;
  let fixture: ComponentFixture<BiathlonGradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiathlonGradeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiathlonGradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
