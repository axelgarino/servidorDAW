import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
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

	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioArticulo: ArticuloService,
		public router: Router
	) { }

	ngOnInit() {

		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
			descripcion: ['', [Validators.required, Validators.minLength(4)]],
      precio: ['', [Validators.required, Validators.minLength(4)]],
		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar articulo";
			this.modoNuevo = false;
			this.servicioArticulo.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombreArticulo);
				this.f.descripcion.setValue(rta.descripcionArticulo);
        this.f.precio.setValue(rta.precioArticulo);
				this.articulo = rta;
			});
		} else {
			this.titulo = "Nuevo articulo";
			this.modoNuevo = true;
		}
	}

	get f() {
		return this.formulario.controls;
	}

	onSubmit() {
		if(this.f.nombre.value == "" || this.f.descripcion.value == "" || this.f.precio.value == "" ) {
			Swal.fire({
				title: 'Complete los campos!',
				text: "Es necesario que rellene todos los campos y no deje ninguno vacío",
				icon: 'error',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, claro!'
			})
		}else{
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
						this.servicioArticulo.actualizar(this.articulo).subscribe((rta) => {
							Swal.fire({ icon: 'success', title: 'Exito', allowOutsideClick: false,  });
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
