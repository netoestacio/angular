import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofinsComponent } from './cofins.component';

describe('CofinsComponent', () => {
  let component: CofinsComponent;
  let fixture: ComponentFixture<CofinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
