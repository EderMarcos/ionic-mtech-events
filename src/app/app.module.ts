import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, EventsPage, EventDetailsPage, AboutPage } from '../pages/index';
import { MtTabsComponent } from "../components/mt-tabs-components/components-tabs";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventsPage,
    EventDetailsPage,
    AboutPage,
    MtTabsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventsPage,
    EventDetailsPage,
    AboutPage,
    MtTabsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
