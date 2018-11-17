import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { ApiserviceProvider } from '../providers/apiservice/apiservice';

import { ReportesPage } from '../pages/reportes/reportes';
import { VerreportePage } from '../pages/verreporte/verreporte';
import { NuevoreportePage } from '../pages/nuevoreporte/nuevoreporte';
import { MapaPage } from '../pages/mapa/mapa';


import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReportesPage,
    VerreportePage,
    NuevoreportePage,
    MapaPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReportesPage,
    VerreportePage,
    NuevoreportePage,
    MapaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiserviceProvider,
    Camera,
  ]
})
export class AppModule {}
