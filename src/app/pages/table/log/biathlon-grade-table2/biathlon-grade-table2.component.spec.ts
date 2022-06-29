import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiathlonGradeTable2Component } from './biathlon-grade-table2.component';

describe('GoodsTypeComponent', () => {
  let component: BiathlonGradeTable2Component;
  let fixture: ComponentFixture<BiathlonGradeTable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiathlonGradeTable2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiathlonGradeTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
