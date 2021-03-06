import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorHttpService } from './services/interceptor-http.service';
import { appRoutingModule } from './rutas/rutas-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcaNuevaComponent } from './marca/marca-nueva/marca-nueva.component';
import { ColorComponent } from './color/color.component';
import { ColorNuevoComponent } from './color/color-nuevo/color-nuevo.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ArticuloNuevoComponent } from './articulo/articulo-nuevo/articulo-nuevo.component';



@NgModule({
  declarations: [
		AppComponent,
	    HeaderComponent,
	    FooterComponent,
	    LoginComponent,
	    InicioComponent,
	    MarcaComponent,
	    MarcaNuevaComponent,
	    ColorComponent,
	    ColorNuevoComponent,
	    ArticuloComponent,
	    ArticuloNuevoComponent,
  ],
  imports: [
	  BrowserModule,
	  ReactiveFormsModule,
	  HttpClientModule,
	  appRoutingModule
  ],
	providers: [
	  { provide: HTTP_INTERCEPTORS, useClass : InterceptorHttpService, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
