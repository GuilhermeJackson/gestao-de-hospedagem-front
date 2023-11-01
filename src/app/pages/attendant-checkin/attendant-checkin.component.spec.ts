import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantCheckinComponent } from './attendant-checkin.component';

describe('AttendantCheckinComponent', () => {
  let component: AttendantCheckinComponent;
  let fixture: ComponentFixture<AttendantCheckinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendantCheckinComponent]
    });
    fixture = TestBed.createComponent(AttendantCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
