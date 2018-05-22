import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupdetailpageComponent } from './groupdetailpage.component';

describe('GroupdetailpageComponent', () => {
  let component: GroupdetailpageComponent;
  let fixture: ComponentFixture<GroupdetailpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupdetailpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
