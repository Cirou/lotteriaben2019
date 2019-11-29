import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchgrouppageComponent } from './searchgrouppage.component';

describe('SearchgrouppageComponent', () => {
  let component: SearchgrouppageComponent;
  let fixture: ComponentFixture<SearchgrouppageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchgrouppageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchgrouppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
