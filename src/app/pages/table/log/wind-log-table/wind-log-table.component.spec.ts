import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindLogTableComponent } from './wind-log-table.component';

describe('GoodsTypeComponent', () => {
  let component: WindLogTableComponent;
  let fixture: ComponentFixture<WindLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
