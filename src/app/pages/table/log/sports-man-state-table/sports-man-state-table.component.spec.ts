import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsManStateTableComponent } from './sports-man-state-table.component';

describe('GoodsTypeComponent', () => {
  let component: SportsManStateTableComponent;
  let fixture: ComponentFixture<SportsManStateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsManStateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsManStateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
