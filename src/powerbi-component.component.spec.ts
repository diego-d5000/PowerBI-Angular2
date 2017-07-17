import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PowerBIComponentComponent } from './powerbi-component.component';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { powerBiServiceFactory } from './';

describe('PowerbiComponentComponent', () => {
  let component: PowerBIComponentComponent;
  let fixture: ComponentFixture<PowerBIComponentComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let powerBIService;
  let embedSpy: jasmine.Spy;
  let resetSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: 'PowerBIService', useFactory: powerBiServiceFactory }],
      declarations: [PowerBIComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBIComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    powerBIService = TestBed.get('PowerBIService');

    embedSpy = spyOn(powerBIService, 'embed')
      .and.returnValue(null);
    resetSpy = spyOn(powerBIService, 'reset')
      .and.returnValue(null);

    de = fixture.debugElement.query(By.css('.powerbi-frame'));
    el = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render template', () => {
    expect(el.nodeName).toBe('DIV');
  });

  it('should hold template root node', () => {
    let { powerbiFrame } = component;
    expect(powerbiFrame.nativeElement).toBe(el);
  });

  it('should not embed component without needed props', () => {
    expect(embedSpy.calls.any()).toBe(false);
  });

  it('should embed on props inserted', () => {
    let nextValues: any = {
      accessToken: 'H4sIAAAAAAAEAB2WtQ70CBKE3',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=bd851208e',
      type: 'report',
      id: 'bd851208',
    };

    // convert simple values into SimpleChange object to be readeable by ngOnChnages
    for (let i in nextValues) {
      if (nextValues[i]) {
        nextValues[i] = new SimpleChange('', nextValues[i], false);
      }
    }

    component.ngOnChanges(nextValues);
    fixture.detectChanges();

    expect(embedSpy.calls.any()).toBe(true);
  });

    it('should reset component and embed a new one on props inserted', () => {
    let nextValues: any = {
      accessToken: 'G1aIAAAABBBBEAB2DgE70SEKD2',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=ab254258c',
      type: 'report',
      id: 'ab254258c',
    };

    // convert simple values into SimpleChange object to be readeable by ngOnChnages
    for (let i in nextValues) {
      if (nextValues[i]) {
        nextValues[i] = new SimpleChange('', nextValues[i], false);
      }
    }

    component.ngOnChanges(nextValues);
    fixture.detectChanges();

    expect(embedSpy.calls.any()).toBe(true);
    expect(embedSpy.calls.any()).toBe(true);
  });
});
