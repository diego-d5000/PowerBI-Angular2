import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Inject,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { service as PBIService, IEmbedConfiguration, Embed, models } from 'powerbi-client';

@Component({
  selector: 'powerbi-component',
  template: '<div style="height:100%; width: 100%;" class="powerbi-frame" #powerbiFrame></div>',
})
export class PowerBIComponentComponent implements OnInit, OnChanges {
  component: Embed;
  @Input() accessToken: string;
  @Input() tokenType: string;
  @Input() embedUrl: string;
  @Input() type: string;
  @Input() id: string;
  @Output() embedded: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('powerbiFrame') powerbiFrame: ElementRef;


  constructor( @Inject('PowerBIService') public powerBIService: PBIService.Service) {
  }

  ngOnInit(): void {
    const { accessToken, tokenType, embedUrl, type, id } = this;

    let config: IEmbedConfiguration = { accessToken, tokenType: this.getTokenType(tokenType), embedUrl, type, id };

    if (this.validateOptions(accessToken, embedUrl)) {
      this.embed(this.powerbiFrame.nativeElement, config);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { accessToken, tokenType, embedUrl, type, id } = changes;

    if (accessToken.isFirstChange() && embedUrl.isFirstChange()) {
      return;
    }

    if (accessToken.previousValue === accessToken.currentValue
      || embedUrl.previousValue === embedUrl.currentValue) {
      return;
    }

    if (this.validateOptions(accessToken.currentValue, embedUrl.currentValue)) {

      /* check if change value was provided in changes
       to prevent error accessing to a property of undefined */
      let config: IEmbedConfiguration = {
        accessToken: accessToken && accessToken.currentValue,
        tokenType: tokenType ? this.getTokenType(tokenType.currentValue) : models.TokenType.Aad,
        embedUrl: embedUrl && embedUrl.currentValue,
        type: type && type.currentValue,
        id: id && id.currentValue
      };

      this.embed(this.powerbiFrame.nativeElement, config);
    } else if (this.component) {
      this.reset(this.powerbiFrame.nativeElement);
    }

  }

  /**
   * Validates if needed accessToken and embedUrl aren't empty and are strings
   * @param {string} accessToken - access token to embed component, obtained through pbi rest api
   * @param {string} embedUrl - url obtained through pbi rest api or pbi app
   * @return {boolean}
   */
  validateOptions(accessToken: string, embedUrl: string): boolean {
    if (!(typeof embedUrl === 'string' && embedUrl.length > 0)
      || !(typeof accessToken === 'string' && accessToken.length > 0)
    ) {
      return false;
    }
    return true;
  }

  /**
   * Get the token type class or enum from string ('Embed' or 'Aad')
   * @param {string} tokenType - token type class name in string it must be 'Embed' or 'Aad'
   * @return {models.TokenType}
   */
  getTokenType(tokenType: string): models.TokenType {
    // convert token type string to model class to avoid import of powerbi-client in app
    if (!tokenType || tokenType.length < 0) {
      // default is AAD
      return models.TokenType.Aad;
    } else {
      // capitalize
      tokenType = tokenType.charAt(0).toUpperCase() + tokenType.toLowerCase().slice(1);
      return models.TokenType[tokenType];
    }
  }

  /**
   * Executes an embeding operation with pbi client library
   * and assign the embed component to a property
   * @param {HTMLEelement} element - native element to embed pbi dashboard, report, or whatever
   * @param {IEmbedConfiguration} config - configuration to embed
   * @param {string} config.accessToken - access token to embed component, obtained through pbi rest api
   * @param {string} config.tokenType - type of accessToken, the most common is TokenType.Embed
   * @param {string} config.embedUrl - url obtained through pbi rest api or pbi app
   * @param {string} config.type - type of embedded component, like 'report' or 'dashboard'
   * @param {string} config.id - component/element id like '5dac7a4a-4452-46b3-99f6-a25915e0fe55'
   */
  embed(element: HTMLElement, config: IEmbedConfiguration) {
    this.component = this.powerBIService.embed(element, config);
    this.embedded.emit((this.component as any));
  }

  /**
   * Reset the component to delete the last embedded component
   * @param {HTMLElement} element - native element where the embedded was made
   */
  reset(element: HTMLElement) {
    this.powerBIService.reset(element);
    this.component = null;
  }
}
