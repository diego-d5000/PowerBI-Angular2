import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { PowerBIComponentComponent } from './powerbi-component/powerbi-component.component';

export * from './sample.component';
export * from './powerbi-component/powerbi-component.component'

import { service as PBIService } from 'powerbi-client';
export { service as PBIService } from 'powerbi-client';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PowerBIComponentComponent,
    SampleComponent
  ],
  providers: [PBIService.service],
  exports: [
    PowerBIComponentComponent,
    SampleComponent
  ]
})
export class PowerBIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PowerBIModule
    };
  }
}
