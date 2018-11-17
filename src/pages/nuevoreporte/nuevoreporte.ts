import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { HomePage } from '../home/home';
import { ApiserviceProvider } from '../../providers/apiservice/apiservice';
import { ReportesPage } from '../reportes/reportes';


import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the NuevoreportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevoreporte',
  templateUrl: 'nuevoreporte.html',
})
export class NuevoreportePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public apiservice: ApiserviceProvider,    // Construir apiservice
              private camera: Camera,                   // Construir camera
              public plt: Platform,                 
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
    ) {

  }

  // Inputs para enviar
  public inUsu = '';
  public inDirec = '';
  public inFoto = '';
  public inReporte = '';
  public inFile;
  public inftp;

  // Photo Base64 Store
  public base64Image: string;

  // OpenDrive
  public odFilename = '';
  public odFiledata: Blob;
  // public odFilesize: number;
  public odSessionId = '';
  public odFileId = '';
  public odTmpLoc = '';
  public odDownLink = '';


  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoreportePage');
    this.inFoto = 'Tomar una foto...'
  }

  returnToHome() {
    console.log("Retornando a Home...");
    this.navCtrl.setRoot(HomePage);
  }


  takePhoto() {
    console.log('Take a Photo...');
    
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 750,
      targetHeight: 750,      
    }
    ).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        console.log('Data: ' + imageData);
        this.inFoto = imageData.filename;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        console.log( 'Camera Error: ' + err.message);

        let alert = this.alertCtrl.create( {
          title: 'Vulcano',
          subTitle: 'Camara Error:',
          message: 'Camara no disponible!. Se generara una imagen de prueba.',
          // inputs: [
          //   {
          //     name: 'filesel',
          //     type: 'file',
          //   }
          // ],
          buttons: [
            {
              text: 'Aceptar',
              handler: data => {
                console.log( 'Se generara una imagen de prueba.' );
                this.inFoto = 'Imagen_de_prueba_' + Date.now() + '.test';  
                this.base64Image = 'data:image/jpeg;base64,' + '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M9wcSNhf7o6VcS2UxqQKAEtUwBT7k4WrMUO1aqXfegCtpozqTt/djP8AMVsg1i6Wf9Nm/wB0fzraXpQAGmMualxRtoAoT2/mKRXP3WlXsExls5Sh7jqDXYCPNHkA9qAONjv9bi+WSCJ/cZFX4Hv7sgTKEXuFrofsqnsKetso7UAQW0RRQKurmgR4p6igB61KtRqKkFAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAQ0hpxptADaaaeabQA00004000AMJqJmxT2qvIeKAKd/Ix2Rg4DHn6Ui2kLp0waZcnOD3U5FWLa4hdfvAEdQetAFZrMK3yjNWYIZOmML71I90idMVRuNUVQd0iqPc4oAvSyrEuMjNZNzNuzVC4120UndcKT6Lz/Ks99ZM5221u7E/xNwKANfTpNt3L7gVuxvkVzulwSgmSU5dutb8QwKALI5p4FMUVKooAcq08LQKeKAGhadilFLQAzFKBS0oFACgU8U0CnigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKQ0tBoAaaaacaQigBhphqQimkUAQsKryLmrZWo2SgDJnQ81k3ELEnFdHLDmqj2oPagDlpbeZv43/M1WOlvIfmyfrXWmzX0oFqo7UAczDoqAjK/pWpb6ckeMKK1ltwO1SrDjtQBBDCFA4q2i0qx1KqUAKoqVaRVqQLQAopwoApwFABRS4oxQAmKcBRilAoAUCnUgFLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAJikIp1GKAGYpMU/FJigBhWmFalxSEUAV2SoWj9quEUwqKAKRioEXtVsqKTaKAKwip4jqbaKXAoAiCVIEp4FOAoAYFp4WnAUooAQClxTsUuKAG4pcUtGKAExSgUtFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=';
                console.log( 'File lenght: ' + this.base64Image.length );
              },
            },
          ],
        });
        
        alert.present();
      }
    );
  }


  sendPhoto(params) {
    // Sube la foto a openDrive, usando API-OpenDrive, con esto se obtiene el link de download
    // para con esta informacion subir el reporte a la BD mediante el API-BackEnd(heroku)
    if(!params.usuario) { params.usuario = 'Anonimo' };

    if( (params.direccion) && (this.base64Image) && (params.reporte) ){

      const loader = this.loadingCtrl.create({
        content: "Enviando reporte...",
        duration: 4000,
      });
      loader.present();

      this.odFiledata = new Blob( [this.base64Image] );
      console.log( this.odFiledata.size );

      // Check File
      this.apiservice.opendCheck( this.odFilename ).subscribe(
        res => {
          console.log( 'API responce: ' + JSON.stringify(res) );
          if( res['result'][0] == this.odFilename ) {
            console.log( 'File exist!' );

          }
          else {
            console.log( "File don't exist. This is OK." );
            
            // Login
            this.apiservice.opendLogin().subscribe(
              res => {
                console.log( 'API responce: ' + JSON.stringify(res) );
                console.log( 'Login OK.' );              
                
                // Create File
                this.odFilename = this.inFoto;
                this.odSessionId = res['SessionID'];
                this.apiservice.opendCreate( this.odFilename, this.odSessionId ).subscribe(
                  res => {
                    console.log( 'API responce: ' + JSON.stringify(res) );
                    console.log( 'File created OK.' );

                    // Open File
                    this.odFileId = res['FileId'];
                    this.apiservice.opendOpen( this.odFileId, this.odSessionId, this.odFiledata.size ).subscribe(
                      res => {
                        console.log( 'API responce: ' + JSON.stringify(res) );
                        console.log( 'File opened OK.' );
                        
                        // Chunk File
                        this.odTmpLoc = res['TempLocation'];
                        this.apiservice.opendChunk( this.odFilename, this.odFiledata, this.odSessionId, this.odFileId, this.odTmpLoc, 0, this.odFiledata.size ).subscribe(
                          res => {
                            console.log( 'API responce: ' + JSON.stringify(res) );
                            console.log( 'File chunked OK.' );
                            
                            // Close File
                            this.apiservice.opendClose( this.odSessionId, this.odFileId, this.odFiledata.size, this.odTmpLoc ).subscribe(
                              res => {
                                console.log( 'API responce: ' + JSON.stringify(res) );
                                console.log( 'File Upload OK.' );
                                
                                this.odDownLink = res['DownloadLink'];
                                params.foto = this.odDownLink;
                                
                                // Enviar Reporte
                                this.apiservice.addReport(params).subscribe(
                                  res => {
                                    console.log( 'Reporte enviado.' );
                                    console.log( 'API responce: ' + JSON.stringify(res) );

                                    loader.dismissAll();

                                    // Ver reporte creado
                                    this.navCtrl.setRoot(ReportesPage);     

                                  },
                                  err => {
                                    console.log( 'Error enviado reporte!' );
                                    console.log(err.message);
                                  }
                                );

                              },
                              err => {
                                console.log( "File Close Error!" );
                                console.log( 'Errro code: ' + err.error.error.code + '; Mensaje: ' + err.error.error.message );
                              }
                            );

                          },
                          err => {
                            console.log( "File Chunk Error!" );
                            console.log( 'Errro code: ' + err.error.error.code + '; Mensaje: ' + err.error.error.message );
                          }
                        );

                      },
                      err => {
                        console.log( "File open Error!" );
                        console.log( 'Errro code: ' + err.error.error.code + '; Mensaje: ' + err.error.error.message );
                      }
                    );
                  },
                  err => {
                    console.log( "File creation Error!" );
                    console.log( 'Errro code: ' + err.error.error.code + '; Mensaje: ' + err.error.error.message );
                  }
                );
              },
              err => {
                console.log( "Login Error!" );
                console.log( 'Errro code: ' + err.error.error.code + '; Mensaje: ' + err.error.error.message );
              }
            );
          }
        },
        err => {
          console.log( 'Error check file!' );
          console.log( 'Errro code: ' + err.error.error.code + '; Mensaje: ' + err.error.error.message );
        }
      );
      
      loader.dismissAll();

    }
    else{
      let alert = this.alertCtrl.create( {
        title: 'Vulcano',
        subTitle: 'Error de Reporte:',
        message: 'Debe indicar una direccion, tomar una foto y describir el reporte.',
        buttons: [
          {
            text: 'Aceptar',
            handler: data => {
              console.log( 'Faltan parametros...' );
              console.log('Direccion: ' + params.direccion);
              console.log('Foto: ' + params.foto);
              console.log('Reporte: ' + params.reporte);
            },
          },
        ],
      });
      
      alert.present();
    }
  }

}
