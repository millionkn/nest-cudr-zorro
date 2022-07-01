import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkijumpFreeGradeTableComponent } from './skijump-free-grade-table.component';

describe('GoodsTypeComponent', () => {
  let component: SkijumpFreeGradeTableComponent;
  let fixture: ComponentFixture<SkijumpFreeGradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkijumpFreeGradeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkijumpFreeGradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
