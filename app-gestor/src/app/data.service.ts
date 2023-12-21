import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { LoginService } from "./login/login.service";
import { Tarea } from "./tarea.model";

@Injectable()
export class DataService {
    listaActualizada = new Subject<Tarea[]>

    constructor(private httpClient: HttpClient, private _loginService:LoginService) { }

    guardarTarea(tareas: Tarea[]) {
        const token = this._loginService.getIdToken();

        this.httpClient.put("https://gestor-tareas-bf641-default-rtdb.europe-west1.firebasedatabase.app/datos.json?auth=" + token, tareas)
            .pipe(
                catchError(error => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            )
            .subscribe(response => {
                console.log("Se han guardado las tareas:", response);
                // Emite el Subject para notificar cambios
                this.listaActualizada.next(tareas);
            });
    }

    recogerTareas() {
        const token = this._loginService.getIdToken();
        return this.httpClient.get<Tarea[]>("https://gestor-tareas-bf641-default-rtdb.europe-west1.firebasedatabase.app/datos.json?auth=" + token)
            .pipe(tap(resp => {
                this.listaActualizada.next(resp);
            }));
    }

    actualizarTarea(indice:number, tarea:Tarea){
        const token=this._loginService.getIdToken();
        let url = "https://gestor-tareas-bf641-default-rtdb.europe-west1.firebasedatabase.app/datos/"+indice+".json?auth="+ token;
        this.httpClient.put(url,tarea)
            .pipe(
                catchError(error => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            )
            .subscribe(response => {
                console.log("Se ha actualizado la fecha maxima:", response);
            });
    }

    //eliminar
    eliminarTarea(indice:number){
        const token=this._loginService.getIdToken();
        let url = "https://gestor-tareas-bf641-default-rtdb.europe-west1.firebasedatabase.app/datos/"+indice+".json?auth="+ token;
        this.httpClient.delete(url)
            .pipe(
                catchError(error => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            )
            .subscribe(response => {
                console.log("Se ha eliminado la tarea:", response);
            });
    }
}
