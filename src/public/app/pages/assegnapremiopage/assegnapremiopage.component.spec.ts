import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssegnapremiopageComponent } from './lotterypage.component';

describe('AssegnapremiopageComponent', () => {
  let component: AssegnapremiopageComponent;
  let fixture: ComponentFixture<AssegnapremiopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssegnapremiopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssegnapremiopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
