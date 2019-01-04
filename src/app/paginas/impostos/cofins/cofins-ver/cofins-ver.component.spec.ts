import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofinsVerComponent } from './cofins-ver.component';

describe('CofinsVerComponent', () => {
  let component: CofinsVerComponent;
  let fixture: ComponentFixture<CofinsVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofinsVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofinsVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
