import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca-nueva',
  templateUrl: './marca-nueva.component.html',
  styleUrls: ['./marca-nueva.component.css']
})
export class MarcaNuevaComponent implements OnInit {

  formulario: FormGroup;
	titulo: string;
	modoNuevo: boolean;
	marca: any;
	enviado: boolean;

  constructor(
    private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioMarca: MarcaService,
		public router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
			descripcion: ['', [Validators.required, Validators.minLength(4)]],

		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar marca";
			this.modoNuevo = false;
			this.servicioMarca.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombreMarca);
				this.f.descripcion.setValue(rta.descripcionMarca);
				this.marca = rta;
			});
		} else {
			this.titulo = "Nueva Marca";
			this.modoNuevo = true;
		}
  }

  get f() {
		return this.formulario.controls;
	}
	
	onSubmit() {
		if (this.f.nombre.value == "" || this.f.descripcion.value == "") {
			// alert('¡Por favor complete todos los campos!')
			Swal.fire({
				title: '¡Complete los campos!',
				text: "Es necesario que rellene todos los campos y no deje ninguno vacio",
				icon: 'error',
				showCancelButton: false,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Aceptar'
			})
		} else {
			Swal.fire({
				title: '¿Esta seguro que desea continuar?',
				text: "¡Esta accion no podra ser revertida!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, claro!',
				cancelButtonText: 'Cancelar'
			}).then((result) => {
				if (result.value) {
					//Me fijo en el modo de pantalla
					if (this.modoNuevo) {
						var nuevaMarca: any;
						nuevaMarca = {};
						nuevaMarca.nombreMarca = this.f.nombre.value;
						nuevaMarca.descripcionMarca = this.f.descripcion.value;
						this.servicioMarca.guardar(nuevaMarca).subscribe((rta) => {
							this.router.navigate(["marcas"]);
						}, (error) => {
							alert('Error al cargar');
						});
					} else {
						//Actualizo el modelo de acuerdo a los valores de los input del formulario
						this.marca.nombreMarca = this.f.nombre.value;
						this.marca.descripcionMarca = this.f.descripcion.value;
						this.servicioMarca.actualizar(this.marca).subscribe((rta) => {
							Swal.fire({ icon: 'success', title: 'Exito', allowOutsideClick: false, text: 'Texto' });
							this.router.navigate(["marcas"]);
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
