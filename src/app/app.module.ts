import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from "../config/firebase.config";

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AgmCoreModule } from '@agm/core';

import { MyApp } from './app.component';
import { MtTabsComponent } from "../components/mt-tabs-component/mt-tabs.component";
import { MtSlideComponent } from "../components/mt-slide-component/mt-slide.component";
import { MtEventPage_1Page } from "../pages/mt-event-page-1/mt-event-page-1";
import { MtEventPage_2Page } from "../pages/mt-event-page-2/mt-event-page-2";
import { MtEventPage_3Page } from "../pages/mt-event-page-3/mt-event-page-3";
import { EnventProvider } from '../providers/envent/envent';
import { ToastProvider } from '../providers/toast/toast';
import { MtListComponent } from "../components/mt-list-component/mt-list.component";
import { MtCardComponent } from "../components/mt-card-component/mt-card-component";
import { MtMapsPage } from "../pages/mt-maps-page/mt-maps-page";
import { MtFormFeedbackPage } from "../pages/mt-form-feedback/mt-form-feedback";

@NgModule({
  declarations: [
    MyApp,
    MtTabsComponent,
    MtSlideComponent,
    MtEventPage_1Page,
    MtEventPage_2Page,
    MtEventPage_3Page,
    MtMapsPage,
    MtFormFeedbackPage,
    MtSlideComponent,
    MtTabsComponent,
    MtListComponent,
    MtCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPxN_-ncHex7P1JpCYZjpJnMSD5ytiyBA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MtTabsComponent,
    MtSlideComponent,
    MtEventPage_1Page,
    MtEventPage_2Page,
    MtEventPage_3Page,
    MtMapsPage,
    MtFormFeedbackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EnventProvider,
    BarcodeScanner,
    ToastProvider
  ]
})
export class AppModule {}
