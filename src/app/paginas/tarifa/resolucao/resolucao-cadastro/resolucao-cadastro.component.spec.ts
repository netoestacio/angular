import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucaoCadastroComponent } from './resolucao-cadastro.component';

describe('ResolucaoCadastroComponent', () => {
  let component: ResolucaoCadastroComponent;
  let fixture: ComponentFixture<ResolucaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
