import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { LoginGuardian } from './login/guardian';
import { DataService } from './data.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListadoComponentComponent } from './listado-component/listado-component.component';
import { TareasService } from './tareas.service';
import { AgregarComponentComponent } from './agregar-component/agregar-component.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { ActualizarComponentComponent } from './actualizar-component/actualizar-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';

const appRoutes: Routes =[
  {path:'', component: HomeComponentComponent},
  {path:'listadoR/:refresh', component: ListadoComponentComponent, canActivate:[LoginGuardian]},
  {path:'listado', component: ListadoComponentComponent, canActivate:[LoginGuardian]},
  {path:'agregar', component: AgregarComponentComponent, canActivate:[LoginGuardian]},
  {path:'actualiza/:id', component: ActualizarComponentComponent, canActivate:[LoginGuardian]},
  {path:'login', component: LoginComponent},
  {path:'**', component: ErrorComponentComponent}, //Cualquier cosa diferente a lo anterior entra aqui
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListadoComponentComponent,
    AgregarComponentComponent,
    ErrorComponentComponent,
    ActualizarComponentComponent,
    HomeComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ],
  providers: [
    TareasService,
    LoginService,
    CookieService,
    LoginGuardian,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
