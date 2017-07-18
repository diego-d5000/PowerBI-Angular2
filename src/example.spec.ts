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

    de = fixture.debugElement.query(By.css('.powerbi-frame'));
    el = de.nativeElement;
  });

  it('should embed creating an iframe', () => {
    let nextValues: any = {
      accessToken: 'H4sIAAAAAAAEAB2WtQ70CBKE3',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=bd851208e',
      type: 'report',
      id: 'bd851208e',
    };

    let convertedValues = {};

    // convert simple values into SimpleChange object to be readeable by ngOnChnages
    for (let i in nextValues) {
      if (nextValues[i]) {
        convertedValues[i] = new SimpleChange('', nextValues[i], false);
      }
    }

    component.ngOnChanges(convertedValues);
    fixture.detectChanges();

    expect(el.hasChildNodes()).toBe(true);
    expect(el.firstChild.nodeName).toBe('IFRAME');
    expect(el.querySelector('iframe').getAttribute('src').includes(nextValues.embedUrl)).toBe(true);
  });

    it('should reset iframe and create a new one on props inserted', () => {
    let nextValues: any = {
      accessToken: 'G1aIAAAABBBBEAB2DgE70SEKD2',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=ab254258c',
      type: 'report',
      id: 'ab254258c',
    };

    let convertedValues = {};

    // convert simple values into SimpleChange object to be readeable by ngOnChnages
    for (let i in nextValues) {
      if (nextValues[i]) {
        convertedValues[i] = new SimpleChange('', nextValues[i], false);
      }
    }

    component.ngOnChanges(convertedValues);
    fixture.detectChanges();

    expect(el.hasChildNodes()).toBe(true);
    expect(el.firstChild.nodeName).toBe('IFRAME');
    expect(el.querySelector('iframe').getAttribute('src').includes(nextValues.embedUrl)).toBe(true);
  });
});
