import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsearchpageComponent } from './groupsearchpage.component';

describe('GroupsearchpageComponent', () => {
  let component: GroupsearchpageComponent;
  let fixture: ComponentFixture<GroupsearchpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsearchpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
