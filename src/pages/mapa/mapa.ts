import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';


/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public localidad = 'todas';


  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  returnToHome() {
    console.log("Retornando a Home...");
    this.navCtrl.setRoot(HomePage);
  }

}

