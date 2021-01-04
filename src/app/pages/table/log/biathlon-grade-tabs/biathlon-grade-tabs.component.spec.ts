import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiathlonGradeTabsComponent } from './biathlon-grade-tabs.component';

describe('BiathlonGradeTabsComponent', () => {
  let component: BiathlonGradeTabsComponent;
  let fixture: ComponentFixture<BiathlonGradeTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiathlonGradeTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiathlonGradeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
