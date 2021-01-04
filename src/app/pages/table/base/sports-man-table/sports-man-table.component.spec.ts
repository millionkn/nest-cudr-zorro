import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsManTableComponent } from './sports-man-table.component';

describe('GoodsTypeComponent', () => {
  let component: SportsManTableComponent;
  let fixture: ComponentFixture<SportsManTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsManTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsManTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
