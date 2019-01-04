import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofinsListarComponent } from './cofins-listar.component';

describe('CofinsListarComponent', () => {
  let component: CofinsListarComponent;
  let fixture: ComponentFixture<CofinsListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofinsListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofinsListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
