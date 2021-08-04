import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MarcaService } from '../services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  filtrarMarcasForm: FormGroup;
	marcas: any;
	orderNombreDesc: boolean;
  constructor(private servicioMarcas:MarcaService,
        private formBuilder: FormBuilder,
        private router : Router) { }

  ngOnInit() {
    this.filtrarMarcasForm = this.formBuilder.group({
      filtro: ['']
    });
    // Debo pedir las marcas al backend
		this.cargarDatos();
  }

  cargarDatos(){
    this.servicioMarcas.pedirMarcas().subscribe((rta) => {
			console.log(rta);
			this.marcas = rta;
		}, (error) => {
			console.log(error);
		});
  }

  nuevaMarca(){
    this.router.navigate(["marcas" , "nuevo"]);
  }

  ver(id: number) {
		this.router.navigate(["marcas" , id]);
		
	}

  get f() {
		return this.filtrarMarcasForm.controls;
	}

  filtrarImpl(valor: string, orden? : string) {
		this.servicioMarcas.pedirMarcasFiltradosPorNombre(valor, orden).subscribe((rta: any) => {
			console.log(rta);
			if (rta && rta.content) {
				this.marcas = rta.content;	
			} else {
				this.marcas = rta;
			}
		}, (error) => {
			console.log(error);
		});
	}

  filtrar() {
		this.filtrarImpl(this.f.filtro.value);
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
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'nombreMarca,desc' : 'nombreMarca,asc' );
			
		}
	}

}
