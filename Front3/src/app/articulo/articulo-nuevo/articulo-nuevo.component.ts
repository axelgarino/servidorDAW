import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/models/articulo';
import { Color } from 'src/app/models/color';
import { Marca } from 'src/app/models/marca';

import { ArticuloService } from 'src/app/services/articulo.service';
import { ColorService } from 'src/app/services/color.service';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-articulo-nuevo',
	templateUrl: './articulo-nuevo.component.html',
	styleUrls: ['./articulo-nuevo.component.css']
})
export class ArticuloNuevoComponent implements OnInit {

	formulario: FormGroup;
	titulo: string;
	modoNuevo: boolean;
	articulo: any;
	enviado: boolean;
	colorElegido: any;

	marcas: any = {};
	marca: Marca;
	marcaCombo: Marca;
	colores: any = {};
	color: Color;
	colorCombo: Color;


	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioArticulo: ArticuloService,
		public servicioMarca: MarcaService,
		public servicioColor: ColorService,
		public router: Router
	) { }

	ngOnInit() {

		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
			descripcion: ['', [Validators.required, Validators.minLength(4)]],
			precio: ['', [Validators.required, Validators.minLength(4)]],
			marca: ['', [Validators.required, Validators.minLength(4)]],
			color: ['', [Validators.required, Validators.minLength(4)]],
			marcaCombo: ['', [Validators.required, Validators.minLength(4)]],
			colorCombo: ['', [Validators.required, Validators.minLength(4)]],
		});

		// Debo pedir las marcas al backend
		this.servicioMarca.pedirMarcas().subscribe((respuesta) => {
			this.marcas = respuesta;
		});

		// Debo pedir los colores al backend
		this.servicioColor.pedirColores().subscribe((respuesta) => {
			this.colores = respuesta;
		});

		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar articulo";
			this.modoNuevo = false;
			this.servicioArticulo.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombreArticulo);
				this.f.descripcion.setValue(rta.descripcionArticulo);
				this.f.precio.setValue(rta.precioArticulo);
				this.f.marca.setValue(rta.marcaArticulo.nombreMarca);
				this.f.color.setValue(rta.colorArticulo.nombreColor);
				this.articulo = rta;
			});
		} else {
			this.titulo = "Nuevo articulo";
			this.modoNuevo = true;
		}
	}

	//PIDO LAS MARCAS PARA CARGAR EN EL COMBOBOX
	/*
	cargarMarcas() {
		this.servicioMarca.pedirMarcas().subscribe((rta) => {
			console.log(rta);
			this.marcas = rta;
		}, (error) => {
			console.log(error);
		});
	}
	*/

	get f() {
		return this.formulario.controls;
	}

	onSubmit() {
		if (this.f.nombre.value == "" || this.f.descripcion.value == "" || this.f.precio.value == ""
		|| this.f.marca.value == null || this.f.color.value == null 
		|| this.f.marcaCombo.value == "" || this.f.colorCombo.value == "") {
			Swal.fire({
				title: 'Complete los campos!',
				text: "Es necesario que rellene todos los campos y no deje ninguno vacío",
				icon: 'error',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, claro!'
			})
		} else {
			Swal.fire({
				title: 'Esta seguro que desea continuar?',
				text: "¡No podrás revertir esto!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, claro!'
			}).then((result) => {
				if (result.value) {
					//Me fijo en el modo de pantalla
					if (this.modoNuevo) {
						var nuevoArticulo: any;
						nuevoArticulo = {};
						nuevoArticulo.nombreArticulo = this.f.nombre.value;
						nuevoArticulo.descripcionArticulo = this.f.descripcion.value;
						nuevoArticulo.precioArticulo = this.f.precio.value;
						this.marca = this.f.marca.value;
						nuevoArticulo.marcaArticulo = this.marca;
						this.color = this.f.color.value;
						nuevoArticulo.colorArticulo = this.color;

						this.servicioArticulo.guardar(nuevoArticulo).subscribe((rta) => {
							this.router.navigate(["articulos"]);
						}, (error) => {
							alert('Error al cargar');
						});
					} else {
						//Actualizo el modelo de acuerdo a los valores de los input del formulario
						this.articulo.nombreArticulo = this.f.nombre.value;
						this.articulo.descripcionArticulo = this.f.descripcion.value;
						this.articulo.precioArticulo = this.f.precio.value;
						//marca
						if(this.f.marcaCombo.value == null){
							//this.marca = this.f.marca.value;
							//this.articulo.marcaArticulo = this.marca;
						}else{
							this.marcaCombo = this.f.marcaCombo.value;
							this.articulo.marcaArticulo = this.marcaCombo;
						}
						//COLOR
						if(this.f.colorCombo.value == null){
							//this.color = this.f.color.value;
							//this.articulo.colorArticulo = this.color;
						}else{
							this.colorCombo = this.f.colorCombo.value;
							this.articulo.colorArticulo = this.colorCombo;
						}
						
						//this.color = this.f.color.value;
						//this.articulo.colorArticulo = this.color;

						this.servicioArticulo.actualizar(this.articulo).subscribe((rta) => {
							Swal.fire({ icon: 'success', title: 'Exito', allowOutsideClick: false, });
							this.router.navigate(["articulos"]);
						}, (error) => {
							console.error(error);
							Swal.fire({ icon: 'error', title: 'Error!!', allowOutsideClick: false, text: error.message });
						});
					}
				}
			})
		}






	}

}
