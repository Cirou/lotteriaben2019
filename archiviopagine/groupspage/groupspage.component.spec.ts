import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupspageComponent } from './groupspage.component';

describe('GroupspageComponent', () => {
  let component: GroupspageComponent;
  let fixture: ComponentFixture<GroupspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
