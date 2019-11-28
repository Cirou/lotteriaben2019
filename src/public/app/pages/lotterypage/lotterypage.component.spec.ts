import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotterypageComponent } from './lotterypage.component';

describe('LotterypageComponent', () => {
  let component: LotterypageComponent;
  let fixture: ComponentFixture<LotterypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotterypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotterypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
