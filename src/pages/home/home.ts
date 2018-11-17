import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


// New Pages
import { ReportesPage } from '../reportes/reportes';
import { NuevoreportePage } from '../nuevoreporte/nuevoreporte';
import { MapaPage } from '../mapa/mapa';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  
  constructor(public navCtrl: NavController) {
  }

  openReportsPage() {
    console.log("Cambiando a Reportes page...");
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(ReportesPage);
  }


  openNewReportPage() {
    console.log("Cambiando a NuevoReporte page...");
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(NuevoreportePage);
  }

  openMapsPage() {
    console.log("Cambiando a Mapa page...");
    this.navCtrl.setRoot(MapaPage);
  }



}
