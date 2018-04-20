import { NgModule } from '@angular/core';
import { MtTabsComponent } from "./mt-tabs-component/mt-tabs.component";
import { MtSlideComponent } from "./mt-slide-component/mt-slide.component";
import { ComponentsMtListComponent } from './mt-list.component/mt-list.component.';
@NgModule({
	declarations: [
	  MtSlideComponent,
    MtTabsComponent,
    ComponentsMtListComponent
  ],
	imports: [],
	exports: [
	  MtSlideComponent,
    MtTabsComponent,
    ComponentsMtListComponent
  ]
})
export class ComponentsModule {}
