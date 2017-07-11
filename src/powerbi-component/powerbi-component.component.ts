import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { service as PBIService, IEmbedConfiguration, Embed } from 'powerbi-client';

@Component({
  selector: 'powerbi-component',
  template: '<div class="powerbi-frame" #powerbiFrame></div>',
  styleUrls: ['./powerbi-component.component.css'],
  providers: [PBIService.Service]
})
export class PowerBIComponentComponent implements OnInit, OnChanges {
  powerBIService: PBIService.Service;
  component: Embed;
  @Input() accessToken: string;
  @Input() embedUrl: string;
  @Output() onEmbedded: Function;
  @ViewChild('powerbiFrame') powerbiFrame: HTMLElement;


  constructor(powerBIService: PBIService.Service) {
  }

  ngOnInit() {
    const { accessToken, embedUrl } = this;
    if (this.validateOptions(accessToken, embedUrl)) {
      this.powerBIService.embed(this.powerbiFrame, <IEmbedConfiguration>{ accessToken, embedUrl })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const accessToken: SimpleChange = changes.accessToken;
    const embedUrl: SimpleChange = changes.embedUrl;

    if (accessToken.previousValue === accessToken.currentValue
      || embedUrl.previousValue === embedUrl.previousValue) {
      return;
    }

    if (this.validateOptions(this.accessToken, this.embedUrl)) {
      this.embed(this.powerbiFrame, this.accessToken, this.embedUrl);
    } else if (this.component) {
      this.reset(this.powerbiFrame);
    }

  }

  validateOptions(accessToken: string, embedUrl: string) {
    if (!(typeof embedUrl === 'string' && embedUrl.length > 0)
      || !(typeof accessToken === 'string' && accessToken.length > 0)
    ) {
      return false;
    }
  }

  embed(element: HTMLElement, accessToken: string, embedUrl: string) {
    this.powerBIService.embed(element, <IEmbedConfiguration>{ accessToken, embedUrl })
    this.onEmbedded({ embed: this.component });
  }

  reset(element: HTMLElement) {
    this.powerBIService.reset(element);
    this.component = null;
  }
}
