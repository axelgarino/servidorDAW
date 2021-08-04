import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticuloService } from '../services/articulo.service';

@Component({
	selector: 'app-articulo',
	templateUrl: './articulo.component.html',
	styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

	filtrarArticulosForm: FormGroup;
	articulos: any;
	orderNombreDesc: boolean;

	constructor(private servicioArticulos: ArticuloService,
		private formBuilder: FormBuilder,
		private router : Router) { }

	ngOnInit() {
		this.filtrarArticulosForm = this.formBuilder.group({
			filtro: ['']
		});

		// Debo pedir los dominios al backend
		this.cargarDatos();
	}

	cargarDatos() {
		this.servicioArticulos.pedirArticulos().subscribe((rta) => {
			console.log(rta);
			this.articulos = rta;
		}, (error) => {
			console.log(error);
		});
	}


	nuevoArticulo() {
		this.router.navigate(["articulos" , "nuevo"]);
	}


	ver(id: number) {
		this.router.navigate(["articulos" , id]);
		//Router ir a /dominios/:id
	}

	get f() {
		return this.filtrarArticulosForm.controls;
	}

	filtrar() {
		this.filtrarImpl(this.f.filtro.value);
	}

	filtrarImpl(valor: string, orden? : string) {
		this.servicioArticulos.pedirArticulosFiltradosPorNombre(valor, orden).subscribe((rta: any) => {
			console.log(rta);
			if (rta && rta.content) {
				this.articulos = rta.content;	
			} else {
				this.articulos = rta;
			}
		}, (error) => {
			console.log(error);
		});
	}

	limpiar() {
		this.f.filtro.setValue('');
		this.filtrar();
	}

	keyPress(evento: KeyboardEvent) {
		if (evento.keyCode === 13) {
			this.filtrarImpl(this.f.filtro.value);
		}
	}

	ordenar(estrategia: string) {
		if (estrategia === 'nombre') {
			this.orderNombreDesc = !this.orderNombreDesc;
			//llamar al metodo de filtrar 
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'nombreArticulo,desc' : 'nombreArticulo,asc' );
			
		}
	}


}

