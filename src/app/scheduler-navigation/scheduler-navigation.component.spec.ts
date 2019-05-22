import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerNavigationComponent } from './scheduler-navigation.component';

describe('SchedulerNavigationComponent', () => {
  let component: SchedulerNavigationComponent;
  let fixture: ComponentFixture<SchedulerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
