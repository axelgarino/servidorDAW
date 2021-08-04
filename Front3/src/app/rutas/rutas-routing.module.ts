import { Routes, RouterModule } from '@angular/router';
import { ArticuloNuevoComponent } from '../articulo/articulo-nuevo/articulo-nuevo.component';
import { ArticuloComponent } from '../articulo/articulo.component';
import { ColorNuevoComponent } from '../color/color-nuevo/color-nuevo.component';
import { ColorComponent } from '../color/color.component';
import { DominioNuevoComponent } from '../dominio/dominio-nuevo/dominio-nuevo.component';
import { DominioComponent } from '../dominio/dominio.component';
import { InicioComponent } from '../inicio/inicio.component';
import { LoginComponent } from '../login/login.component';
import { MarcaNuevaComponent } from '../marca/marca-nueva/marca-nueva.component';
import { MarcaComponent } from '../marca/marca.component';
import { Authguard } from '../services/authguard.service';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'inicio', component: InicioComponent, canActivate : [Authguard] },
	{ path: 'dominios', component: DominioComponent, canActivate : [Authguard] },
	{ path: 'dominios/:id', component: DominioNuevoComponent, canActivate : [Authguard] },
	{ path: 'marcas', component: MarcaComponent, canActivate : [Authguard] },
	{ path: 'marcas/:id', component: MarcaNuevaComponent, canActivate : [Authguard] },
	{ path: 'colores', component: ColorComponent, canActivate : [Authguard] },
	{ path: 'colores/:id', component: ColorNuevoComponent, canActivate : [Authguard] },
	{ path: 'articulos', component: ArticuloComponent, canActivate : [Authguard] },
	{ path: 'articulos/:id', component: ArticuloNuevoComponent, canActivate : [Authguard] },
	{ path: '**', redirectTo : 'inicio' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
