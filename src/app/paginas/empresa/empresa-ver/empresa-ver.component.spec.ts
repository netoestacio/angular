import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaVerComponent } from './empresa-ver.component';

describe('EmpresaVerComponent', () => {
  let component: EmpresaVerComponent;
  let fixture: ComponentFixture<EmpresaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
