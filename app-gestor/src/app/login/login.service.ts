import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class LoginService{
    constructor(private router:Router, private cookie:CookieService){}

    token!:string;
    registrandose: boolean = false;

    login(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            response=>{
                firebase.auth().currentUser?.getIdToken().then(
                    token=>{
                        this.token=token;
                        this.cookie.set("token", token);
                        this.router.navigate(['/listado']);
                    }
                );
            }
        ).catch(error => {
          this.handleAuthenticationError(error);
        }); 
    }

    getIdToken(){
        return this.cookie.get("token");
    }

    estaLogueado(){
        return this.cookie.get("token");
    }

    noLogueado(){
        firebase.auth().signOut().then(()=>{
            this.token="";
            this.cookie.set("token", this.token);
            this.router.navigate(['/']);
        });
    }

    toggleRegistro() {
        this.registrandose = !this.registrandose;
      }

    registrar(credentials: { email: string, password: string }) {
      // Reglas de contraseña correctas?
      if (!this.isValidPassword(credentials.password)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El formato de la contraseña no es el esperado.",
        });
        return;
      }
  
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => {
          firebase.auth().currentUser?.getIdToken().then(
            token => {
              this.token = token;
              this.cookie.set("token", token);
              this.router.navigate(['/listado']);
            }
          );
        });
    }

    private isValidPassword(password: string): boolean {
      const minLength = 6;
      return password.length >= minLength;
    }

    private handleAuthenticationError(error: any) {
      let errorMessage = "Algo no salió bien!";
      let especific = "Comprueba el correo o la contraseña";
    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: especific
      });
    }
    
}