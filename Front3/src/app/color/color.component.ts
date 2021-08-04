import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from '../services/color.service';

@Component({
	selector: 'app-color',
	templateUrl: './color.component.html',
	styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

	filtrarColoresForm: FormGroup;
	colores: any;
	orderNombreDesc: boolean;

	constructor(private servicioColores: ColorService,
		private formBuilder: FormBuilder,
		private router : Router) { }

	ngOnInit() {
		this.filtrarColoresForm = this.formBuilder.group({
			filtro: ['']
		});

		// Debo pedir los dominios al backend
		this.cargarDatos();
	}

	cargarDatos() {
		this.servicioColores.pedirColores().subscribe((rta) => {
			console.log(rta);
			this.colores = rta;
		}, (error) => {
			console.log(error);
		});
	}


	nuevoColor() {
		this.router.navigate(["colores" , "nuevo"]);
	}


	ver(id: number) {
		this.router.navigate(["colores" , id]);
		//Router ir a /dominios/:id
	}

	get f() {
		return this.filtrarColoresForm.controls;
	}

	filtrar() {
		this.filtrarImpl(this.f.filtro.value);
	}

	filtrarImpl(valor: string, orden? : string) {
		this.servicioColores.pedirColoresFiltradosPorNombre(valor, orden).subscribe((rta: any) => {
			console.log(rta);
			if (rta && rta.content) {
				this.colores = rta.content;	
			} else {
				this.colores = rta;
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
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'nombreColor,desc' : 'nombreColor,asc' );
			
		}
	}


}

