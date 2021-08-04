import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

	
	constructor(private http: HttpClient) { }
	
	pedirColores() {
		return this.http.get(environment.url + 'colores');
	}

	pedirColoresFiltradosPorNombre(filtro: string, orden?: string) {
		if (orden) {
			return this.http.get(environment.url + 'colores?nombre=' + filtro +'&page=0' + '&sort=' + orden);
		}
		return this.http.get(environment.url + 'colores?nombre=' + filtro);
	}

	guardar(nuevoColor: any) {
		return this.http.post(environment.url + 'colores', nuevoColor);
	}

	actualizar(color: any) {
		return this.http.put(environment.url + 'colores/' + color.id, color);
	}

	get(id: string) {
		return this.http.get(environment.url + 'colores/' + id);
	}

	eliminar(id:any){
		return this.http.delete(environment.url+'colores/'+id);
	}

	// guardar(instancia : Dominio) {
		
	// }
}


