import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBIComponentComponent } from './powerbi-component.component';
import { service as PBIService, factories } from 'powerbi-client';

export * from './powerbi-component.component'

export function powerBiServiceFactory() {
  return new PBIService.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PowerBIComponentComponent
  ],
  providers: [
    { provide: 'PowerBIService', useFactory: powerBiServiceFactory } //To inject a instance of pbi client library 
  ],
  exports: [
    PowerBIComponentComponent
  ]
})
export class PowerBIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PowerBIModule
    };
  }
}
