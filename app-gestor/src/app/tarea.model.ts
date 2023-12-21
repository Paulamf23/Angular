export class Tarea{
    
    tarea: string = "";
    fecha_maxima: string = "";

    constructor(tarea: string, fecha_maxima: string) {
        this.tarea = tarea;
        this.fecha_maxima = fecha_maxima;
    }
}