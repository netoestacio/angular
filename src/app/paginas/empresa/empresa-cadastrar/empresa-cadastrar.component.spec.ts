import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaCadastrarComponent } from './empresa-cadastrar.component';

describe('EmpresaCadastrarComponent', () => {
  let component: EmpresaCadastrarComponent;
  let fixture: ComponentFixture<EmpresaCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
