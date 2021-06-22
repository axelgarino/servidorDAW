import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DominioService {

  constructor(private http: HttpClient) { }

  pedirDominios() {
    this.http.get("localhost:8080/dominios").subscribe((rta) => {
      console.log(rta);
    }, (error) => {
      console.log(error);
    });
  }
}
