import { Component, Input, OnInit } from '@angular/core';
import { Tarea } from '../tarea.model';
import { TareasService } from '../tareas.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listado-component',
  templateUrl: './listado-component.component.html',
  styleUrls: ['./listado-component.component.css']
})
export class ListadoComponentComponent implements OnInit {
  titulo = 'Tareas Pendientes';
  refresh: string ="";
  tareas: Tarea[] = [];
  @Input() tareaLista!: Tarea; 
  @Input() indice!: number; 
  
  constructor(private _router:Router, private route:ActivatedRoute, private _tareaService: TareasService, private dataService: DataService) { }

  ngOnInit(): void {
    this.cargarDatos();
    
    this.dataService.listaActualizada.subscribe(
      resp => this.tareas = resp
    )

    this.refresh = this.route.snapshot.params['refresh'];
    if (this.refresh == "refresh") {
      this._router.navigateByUrl("/listado")
    }
  }

  cargarDatos(){
    this._tareaService.cargarTareas().subscribe(misTareas => {
      console.log(misTareas);
      this.tareas = misTareas;
      this.setTareas(misTareas);
    });
  }

  setTareas(tarea:Tarea[]){
    this._tareaService.setTareas(this.tareas);
  }

  eliminarTarea(indice: number){
     this._tareaService.eliminarTarea(indice);
     this._router.navigateByUrl("/listado");
  }
}
