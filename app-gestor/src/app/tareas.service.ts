import { Injectable } from "@angular/core";
import { Tarea } from "./tarea.model";
import { DataService } from "./data.service";

@Injectable()
export class TareasService{
    tareas: Tarea[] = [];
    constructor(private dataService: DataService){}

    agregarTareaServicio(tarea: Tarea){
        this.tareas.push(tarea);        
        //añadir a la base de datos
        this.dataService.guardarTarea(this.tareas);
    }
    
    encontrarTarea(indice:number){
        let tarea:Tarea = this.tareas[indice];
        return tarea;
    }

    actualizarTarea(indice: number, tarea: Tarea) {
        let tareaModificada = this.tareas[indice];   
        
        tareaModificada.tarea = tarea.tarea;
        tareaModificada.fecha_maxima = tarea.fecha_maxima;
        this.tareas[indice] = tareaModificada
        
        this.setTareas(this.tareas)
        this.dataService.actualizarTarea(indice, tarea);
    }
  
    eliminarTarea(indice: number) {
        this.tareas.splice(indice, 1);
    
        // Actualiza el servicio con la nueva lista de tareas
        this.dataService.eliminarTarea(indice);
        this.dataService.guardarTarea(this.tareas);
    }

    cargarTareas(){
        return this.dataService.recogerTareas(); 
    }

    setTareas(misTareas:Tarea[]){
        this.tareas = misTareas;
    }
}