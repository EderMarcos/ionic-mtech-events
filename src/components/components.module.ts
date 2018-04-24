import { NgModule } from '@angular/core';
import { MtFormComponent } from './mt-form/mt-form';
import { TestComponent } from './test/test';
@NgModule({
	declarations: [MtFormComponent,
    TestComponent],
	imports: [],
	exports: [MtFormComponent,
    TestComponent]
})
export class ComponentsModule {}
