import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofinsCadastroComponent } from './cofins-cadastro.component';

describe('CofinsCadastroComponent', () => {
  let component: CofinsCadastroComponent;
  let fixture: ComponentFixture<CofinsCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofinsCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofinsCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
