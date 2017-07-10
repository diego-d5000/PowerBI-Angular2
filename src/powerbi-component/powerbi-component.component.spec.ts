import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerbiComponentComponent } from './powerbi-component.component';

describe('PowerbiComponentComponent', () => {
  let component: PowerbiComponentComponent;
  let fixture: ComponentFixture<PowerbiComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerbiComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerbiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
