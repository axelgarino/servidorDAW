import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from '../services/color.service';
import Swal from 'sweetalert2';

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

	eliminar(id: any){
		Swal.fire({
			title: '¿Está seguro que quiere eliminar este color?',
			text: "Esta accion sera irreversible y el color será totalmente eliminado.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
				this.servicioColores.eliminar(id).subscribe((rta) => {
					this.router.navigate(["colores"]);
					this.cargarDatos();
					Swal.fire({ icon: 'success', title: 'Exito',text: '¡Color eliminado con exito!', allowOutsideClick: false, });

				}, (error) => {
					Swal.fire({
						title: 'Error',
						text: "Este color no pudo ser eliminado, intentelo mas tarde",
						icon: 'error',
						showCancelButton: false,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Aceptar'
					})
				});
			}
		})
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

