import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private token: string;

  constructor(private http: HttpClient) { }

  login(usuario : string, password :string){
    //Aca tenemos que hacer la peticion HTTP

    var tokenUsuario = "Basic" +  window.btoa(usuario + ":" + password)
    var opciones = {
      headers : new HttpHeaders({"Authorization":"Basic" + window.btoa(usuario + ":" + password) })
    }
    this.http.get("http://localhost:8080/login", opciones).subscribe((rta) => {
      //se logueo con exito
      console.log(rta);
    }, (error) => {
      console.log(error);
    });
  }

  get tokenAutorizado(){
    return this.token;
  }

  pedirDominios() {
    this.http.get("http://localhost:8080/dominios").subscribe((rta) => {
      console.log(rta);
    }, (error) => {
      console.log(error);
    });
  }

}
