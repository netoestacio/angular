import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucaoVerComponent } from './resolucao-ver.component';

describe('ResolucaoVerComponent', () => {
  let component: ResolucaoVerComponent;
  let fixture: ComponentFixture<ResolucaoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucaoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucaoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
