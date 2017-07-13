import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerBIComponentComponent } from './powerbi-component.component';
import 'jasmine';

describe('PowerbiComponentComponent', () => {
  let component: PowerBIComponentComponent;
  let fixture: ComponentFixture<PowerBIComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBIComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBIComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
