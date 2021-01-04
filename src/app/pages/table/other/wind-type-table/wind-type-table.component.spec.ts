import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindTypeTableComponent } from './wind-type-table.component';

describe('GoodsTypeComponent', () => {
  let component: WindTypeTableComponent;
  let fixture: ComponentFixture<WindTypeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindTypeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
