import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-color-nuevo',
	templateUrl: './color-nuevo.component.html',
	styleUrls: ['./color-nuevo.component.css']
})
export class ColorNuevoComponent implements OnInit {

	formulario: FormGroup;
	titulo: string;
	modoNuevo: boolean;
	color: any;
	enviado: boolean;

	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioColor: ColorService,
		public router: Router
	) { }

	ngOnInit() {

		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
			colorRGB: ['', [Validators.required, Validators.minLength(4)]],
		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar color";
			this.modoNuevo = false;
			this.servicioColor.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombreColor);
				this.f.colorRGB.setValue(rta.colorRGB);
				this.color = rta;
			});
		} else {
			this.titulo = "Nuevo color";
			this.modoNuevo = true;
		}
	}

	get f() {
		return this.formulario.controls;
	}

	onSubmit() {
		if(this.f.nombre.value == "" || this.f.colorRGB.value == "" ) {
			Swal.fire({
				title: 'Complete los campos!',
				text: "Es necesraio que rellene todos los campos y no deje ninguno vacío",
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
					//modo NUEVO COLOR
					if (this.modoNuevo) {
						var nuevoColor: any;
						nuevoColor = {};
						nuevoColor.nombreColor = this.f.nombre.value;
						nuevoColor.colorRGB = this.f.colorRGB.value;
						this.servicioColor.guardar(nuevoColor).subscribe((rta) => {
							Swal.fire({ icon: 'success', title: 'Exito',text: '¡Color cargado con exito!', allowOutsideClick: false, });
							this.router.navigate(["colores"]);

						}, (error) => {
							Swal.fire({ icon: 'error', title: 'Error!!', allowOutsideClick: false, text: error.message });
						});
					} else {
						//MODO EDITAR
						this.color.nombreColor = this.f.nombre.value;
						this.color.colorRGB = this.f.colorRGB.value;
						this.servicioColor.actualizar(this.color).subscribe((rta) => {
							Swal.fire({ icon: 'success', title: 'Exito',text: '¡Color editado con exito!', allowOutsideClick: false, });
							this.router.navigate(["colores"]);
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