import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantCheckoutComponent } from './attendant-checkout.component';

describe('AttendantCheckoutComponent', () => {
  let component: AttendantCheckoutComponent;
  let fixture: ComponentFixture<AttendantCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendantCheckoutComponent]
    });
    fixture = TestBed.createComponent(AttendantCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
