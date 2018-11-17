import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { HomePage } from '../home/home';
import { ApiserviceProvider } from '../../providers/apiservice/apiservice';
import { VerreportePage } from '../verreporte/verreporte';
import { NuevoreportePage } from '../nuevoreporte/nuevoreporte';

import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the ReportesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportes',
  templateUrl: 'reportes.html',
})
export class ReportesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public apiservice: ApiserviceProvider,    // Construir el servicio api
              public loadingCtrl: LoadingController,
    ) { };


  // Almacen de reportes para visualizarlos
  reports: any[] = [];

  ionViewDidLoad() {
    console.log('Cargando reportes...');

    const loader = this.loadingCtrl.create({
      content: "Cargando reportes...",
      duration: 4000,
    });
    loader.present();

    this.apiservice.getReports().subscribe(
      data => {
        this.reports = data['elementos'].reverse();
        console.log( 'API responce: ' + this.reports.length + ' items.' );
      },
      error => {
        this.reports = [ { 'usuario': 'Admin', 'reporte': error['message'] } ];
        console.log(error.message);
      }
    );      

    loader.dismissAll();
  }


  buttonClick(ind){
    console.log( 'Selected item: ' + ind.id );
    this.navCtrl.push(VerreportePage, ind);
  }


  returnToHome() {
    // console.log("Retornando a Home...");
    this.navCtrl.setRoot(HomePage);
  }


  gotoAddReport() {
    this.navCtrl.setRoot(NuevoreportePage);
  }

}
