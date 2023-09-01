import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMoneyComponent } from './credit-account.component';

describe('SendMoneyComponent', () => {
  let component: SendMoneyComponent;
  let fixture: ComponentFixture<SendMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendMoneyComponent]
    });
    fixture = TestBed.createComponent(SendMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
