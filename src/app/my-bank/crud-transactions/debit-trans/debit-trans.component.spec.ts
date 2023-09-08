import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitTransComponent } from './debit-trans.component';

describe('DebitTransComponent', () => {
  let component: DebitTransComponent;
  let fixture: ComponentFixture<DebitTransComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitTransComponent]
    });
    fixture = TestBed.createComponent(DebitTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
