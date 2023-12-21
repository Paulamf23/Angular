import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from '../tareas.service';
import { Tarea } from '../tarea.model';

@Component({
  selector: 'app-agregar-component',
  templateUrl: './agregar-component.component.html',
  styleUrls: ['./agregar-component.component.css']
})

export class AgregarComponentComponent implements OnInit {
  titulo = 'Agregar tarea';
  tareas: Tarea[] = [];
  
  constructor(private _router:Router, private _tareaService: TareasService){}

  ngOnInit(): void {
    this._tareaService.cargarTareas().subscribe(misTareas => {
      console.log(misTareas);
      this.tareas = Object.values(misTareas) as Tarea[];
      this._tareaService.setTareas(this.tareas);
    });
  }

  cuadroTarea: string = "";
  cuadroFechaMaxima: string = "";

  agregarTarea(){
    let miTarea = new Tarea (this.cuadroTarea, this.cuadroFechaMaxima);
    this._tareaService.agregarTareaServicio(miTarea);

      this._router.navigate(['/listadoR', 'refresh']);
  }

}
