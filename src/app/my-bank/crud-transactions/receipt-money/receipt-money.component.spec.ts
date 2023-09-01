import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptMoneyComponent } from './receipt-money.component';

describe('ReceiptMoneyComponent', () => {
  let component: ReceiptMoneyComponent;
  let fixture: ComponentFixture<ReceiptMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptMoneyComponent]
    });
    fixture = TestBed.createComponent(ReceiptMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
