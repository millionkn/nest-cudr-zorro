import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkijumpGradeTableComponent } from './skijump-grade-table.component';

describe('GoodsTypeComponent', () => {
  let component: SkijumpGradeTableComponent;
  let fixture: ComponentFixture<SkijumpGradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkijumpGradeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkijumpGradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
