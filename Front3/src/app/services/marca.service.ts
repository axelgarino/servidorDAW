import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

	
	constructor(private http: HttpClient) { }
	
	pedirMarcas() {
		return this.http.get(environment.url + 'marcas');
	}

	pedirMarcasFiltradosPorNombre(filtro: string, orden?: string) {
		if (orden) {
			return this.http.get(environment.url + 'marcas?nombre=' + filtro +'&page=0' + '&sort=' + orden);
		}
		return this.http.get(environment.url + 'marcas?nombre=' + filtro);
	}

	guardar(nuevaMarca: any) {
		return this.http.post(environment.url + 'marcas', nuevaMarca);
	}

	actualizar(marca: any) {
		return this.http.put(environment.url + 'marcas/' + marca.id, marca);
	}

	get(id: string) {
		return this.http.get(environment.url + 'marcas/' + id);
	}

}


