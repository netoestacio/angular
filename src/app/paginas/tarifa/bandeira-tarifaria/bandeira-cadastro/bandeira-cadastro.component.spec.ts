import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeiraCadastroComponent } from './bandeira-cadastro.component';

describe('BandeiraCadastroComponent', () => {
  let component: BandeiraCadastroComponent;
  let fixture: ComponentFixture<BandeiraCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeiraCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeiraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
