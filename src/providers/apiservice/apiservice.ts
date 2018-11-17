import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// import { Observable } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';



/*
  Generated class for the ApiserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiserviceProvider {

  constructor(  public http: HttpClient,
                
    ) {
    console.log('Hello ApiserviceProvider Provider');
  }


  apiUrl = 'https://apitestpumba.herokuapp.com/reports'
  
  // API OpenDrive
  opendUrl = 'https://dev.opendrive.com/api/v1'
  opendFoldId = 'NTdfMTEzNjU4ODlfWVRGNzc'
  opendUser = 'pedroalfonumba@outlook.com'
  opendPass = '6lcygb5y'


  downLoadFile(fileUrl: string) {
    console.log('GET: ' + fileUrl );
    return this.http.get( fileUrl, {responseType: 'text'} );
  }


  opendCheck(filename) {

    let url = this.opendUrl + '/upload/checkfileexistsbyname.json/' + this.opendFoldId
    console.log( 'opendCheckFile [' + filename + '];  POST: ' + url );

    return this.http.post( url, '', {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        }),
        params: new HttpParams()
          .set( 'name[]', filename )
      });
  }

  opendLogin() {

    let url = this.opendUrl + '/session/login.json'
    console.log( 'opendLogin [' + this.opendUser + '];  POST: ' + url );

    return this.http.post( url,
      { 'username': this.opendUser,
        'passwd': this.opendPass,
        }, {});
  }

  opendCreate(filename, sessionId) {

    let url = this.opendUrl + '/upload/create_file.json'
    console.log( 'opendCreateFile [' + filename + '];  POST: ' + url );

    return this.http.post( url,
      { 'session_id': sessionId,
        'folder_id': this.opendFoldId,
        'file_name': filename,
        },
      {});
  }

  opendOpen(fileid, sessionid, filesize) {

    let url = this.opendUrl + '/upload/open_file_upload.json'
    console.log( 'opendOpenFileUpload,  POST: ' + url );

    return this.http.post( url,
      { 'session_id': sessionid,
        'file_id': fileid,
        'file_size': filesize,
        },
      {});
  }

  opendChunk(filename, filedata, sessionid, fileid, temploc, chunkoff, chunksize) {

    let url = this.opendUrl + '/upload/upload_file_chunk.json'
    console.log( 'opendChunkFile [ offset: ' + chunkoff + ', size: ' + chunksize + ' ];  POST: ' + url );

    const formdata: FormData = new FormData();

    formdata.append( 'file_data', filedata, filename );
    formdata.append( 'session_id', sessionid);
    formdata.append( 'session_id', sessionid);
    formdata.append( 'file_id', fileid);
    formdata.append( 'temp_location', temploc);
    formdata.append( 'chunk_offset', chunkoff);
    formdata.append( 'chunk_size', chunksize);

    return this.http.post( url, formdata );
  }


  opendClose( sessionid, fileid, filesize, temploc) {

    let url = this.opendUrl + '/upload/close_file_upload.json'
    console.log( 'opendCloseFile,  POST: ' + url );

    return this.http.post( url,
      { 'session_id': sessionid,
        'file_id': fileid,
        'file_size': filesize,
        'temp_location': temploc,
        },
      {});
  }


  getReports() {

      console.log('GET: ' + this.apiUrl );
      return this.http.get( this.apiUrl )     
  }

  addReport(params) {

    console.log('POST: ' + this.apiUrl );

    return this.http.post( this.apiUrl, '', {
      params: new HttpParams()
        .set('usuario',   params.usuario)
        .set('foto',      params.foto)
        .set('direccion', params.direccion)
        // .set('latitud',   params.latitud)
        // .set('longitud',  params.longitud)
        .set('reporte',   params.reporte)
      });
  }


}
