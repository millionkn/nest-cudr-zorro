import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUrlTableComponent } from './movie-url-table.component';

describe('GoodsTypeComponent', () => {
  let component: MovieUrlTableComponent;
  let fixture: ComponentFixture<MovieUrlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieUrlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUrlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
