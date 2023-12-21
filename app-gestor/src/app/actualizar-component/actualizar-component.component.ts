import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../tareas.service';
import { Tarea } from '../tarea.model';

@Component({
  selector: 'app-actualizar-component',
  templateUrl: './actualizar-component.component.html',
  styleUrls: ['./actualizar-component.component.css']
})
export class ActualizarComponentComponent {
  titulo = 'Actualizar Tarea';
  indice!:number;
  tareas: Tarea[] = [];
  
  cuadroTarea: string = "";
  cuadroFechaMaxima: string = "";

  constructor(private _router:Router, private _tareaService: TareasService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.tareas = this._tareaService.tareas;

    this.indice = this.route.snapshot.params['id'];
    let tarea: Tarea = this._tareaService.encontrarTarea(this.indice);

    this.cuadroTarea = tarea.tarea;
    this.cuadroFechaMaxima = tarea.fecha_maxima;

  }

  modificarTarea(){
    //modificar
    let miTarea = new Tarea(this.cuadroTarea, this.cuadroFechaMaxima);
    this._tareaService.actualizarTarea(this.indice, miTarea);
    this._router.navigate(['/listadoR', 'refresh']);
    }
  }
