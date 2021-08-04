import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

	
	constructor(private http: HttpClient) { }
	
	pedirArticulos() {
		return this.http.get(environment.url + 'articulos');
	}

	pedirArticulosFiltradosPorNombre(filtro: string, orden?: string) {
		if (orden) {
			return this.http.get(environment.url + 'articulos?nombre=' + filtro +'&page=0' + '&sort=' + orden);
		}
		return this.http.get(environment.url + 'articulos?nombre=' + filtro);
	}

	guardar(nuevoArticulo: any) {
		return this.http.post(environment.url + 'articulos', nuevoArticulo);
	}

	actualizar(articulo: any) {
		return this.http.put(environment.url + 'articulos/' + articulo.id, articulo);
	}

	get(id: string) {
		return this.http.get(environment.url + 'articulos/' + id);
	}

}



