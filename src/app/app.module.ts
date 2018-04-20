import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MtTabsComponent } from "../components/mt-tabs-component/mt-tabs.component";
import { MtSlideComponent } from "../components/mt-slide-component/mt-slide.component";
import { MtEventPage_1Page } from "../pages/mt-event-page-1/mt-event-page-1";
import { MtEventPage_2Page } from "../pages/mt-event-page-2/mt-event-page-2";
import { MtEventPage_3Page } from "../pages/mt-event-page-3/mt-event-page-3";

@NgModule({
  declarations: [
    MyApp,
    MtTabsComponent,
    MtSlideComponent,
    MtEventPage_1Page,
    MtEventPage_2Page,
    MtEventPage_3Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MtTabsComponent,
    MtSlideComponent,
    MtEventPage_1Page,
    MtEventPage_2Page,
    MtEventPage_3Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
