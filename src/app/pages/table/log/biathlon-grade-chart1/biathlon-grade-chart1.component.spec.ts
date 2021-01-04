import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiathlonGradeChart1Component } from './biathlon-grade-chart1.component';

describe('BiathlonGradeChart1Component', () => {
  let component: BiathlonGradeChart1Component;
  let fixture: ComponentFixture<BiathlonGradeChart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiathlonGradeChart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiathlonGradeChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
