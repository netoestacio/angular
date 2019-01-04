import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisCadastroComponent } from './pis-cadastro.component';

describe('PisCadastroComponent', () => {
  let component: PisCadastroComponent;
  let fixture: ComponentFixture<PisCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PisCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
