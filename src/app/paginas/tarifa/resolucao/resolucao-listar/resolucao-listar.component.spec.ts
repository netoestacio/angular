import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucaoListarComponent } from './resolucao-listar.component';

describe('ResolucaoListarComponent', () => {
  let component: ResolucaoListarComponent;
  let fixture: ComponentFixture<ResolucaoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucaoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucaoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
