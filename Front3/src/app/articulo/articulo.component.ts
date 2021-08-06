import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticuloService } from '../services/articulo.service';
import Swal from 'sweetalert2';
import { MarcaService } from '../services/marca.service';
import { ColorService } from '../services/color.service';

@Component({
	selector: 'app-articulo',
	templateUrl: './articulo.component.html',
	styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

	filtrarArticulosForm: FormGroup;
	articulos: any;
	orderNombreDesc: boolean;
	marcas: any = {};
	colores: any = {};

	constructor(
		private servicioArticulos: ArticuloService,
		public servicioMarca: MarcaService,
		public servicioColor: ColorService,
		private formBuilder: FormBuilder,
		private router : Router) { }

	ngOnInit() {
		this.filtrarArticulosForm = this.formBuilder.group({
			filtro: ['']
		});

		// Debo pedir los articulos al backend
		this.cargarDatos();

		// Debo pedir las marcas al backend
		this.servicioMarca.pedirMarcas().subscribe((resp) => {
			this.marcas = resp;
		  });

		  // Debo pedir los colores al backend
		this.servicioColor.pedirColores().subscribe((respuesta) => {
			this.colores = respuesta;
		 });
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

	eliminar(id: any){
		Swal.fire({
			title: '¿Está seguro que quiere eliminar este articulo?',
			text: "Esta accion sera irreversible y el articulo será totalmente eliminado.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
				this.servicioArticulos.eliminar(id).subscribe((rta) => {
					this.router.navigate(["articulos"]);
					this.cargarDatos();
					Swal.fire({ icon: 'success', title: 'Exito',text: '¡Articulo eliminado con exito!', allowOutsideClick: false, });

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
		if (estrategia === 'descripcion') {
			this.orderNombreDesc = !this.orderNombreDesc;
			//llamar al metodo de filtrar 
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'descripcionArticulo,desc' : 'descripcionArticulo,asc' );
		}
		if (estrategia === 'precio') {
			this.orderNombreDesc = !this.orderNombreDesc;
			//llamar al metodo de filtrar 
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'precioArticulo,desc' : 'precioArticulo,asc' );
		}
	}
}

