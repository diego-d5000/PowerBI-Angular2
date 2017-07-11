import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { PowerBIComponentComponent } from './powerbi-component/powerbi-component.component';

export * from './sample.component';
export * from './powerbi-component/powerbi-component.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PowerBIComponentComponent,
    SampleComponent
  ],
  exports: [
    PowerBIComponentComponent,
    SampleComponent
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule
    };
  }
}
