import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnemometerTableComponent } from './anemometer-table.component';

describe('GoodsTypeComponent', () => {
  let component: AnemometerTableComponent;
  let fixture: ComponentFixture<AnemometerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnemometerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnemometerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
