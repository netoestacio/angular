import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGestorComponent } from './select-gestor.component';

describe('SelectGestorComponent', () => {
  let component: SelectGestorComponent;
  let fixture: ComponentFixture<SelectGestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
