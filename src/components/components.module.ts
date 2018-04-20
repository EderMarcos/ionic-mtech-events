import { NgModule } from '@angular/core';
import { ComponentsSlideComponent } from './components-slide/components-slide';
import { MtTabsComponent } from "./mt-tabs-components/components-tabs";
@NgModule({
	declarations: [ComponentsSlideComponent,
    MtTabsComponent],
	imports: [],
	exports: [ComponentsSlideComponent,
    MtTabsComponent]
})
export class ComponentsModule {}
