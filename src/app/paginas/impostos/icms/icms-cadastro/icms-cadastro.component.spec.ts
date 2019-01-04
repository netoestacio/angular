import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcmsCadastroComponent } from './icms-cadastro.component';

describe('IcmsCadastroComponent', () => {
  let component: IcmsCadastroComponent;
  let fixture: ComponentFixture<IcmsCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcmsCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcmsCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
