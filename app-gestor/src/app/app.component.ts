import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-gestor';

  constructor(private _loginService:LoginService){ }
   
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCK67BOaeXIRCd3AvNvODMrxtFtANWnWQU",
      authDomain: "gestor-tareas-bf641.firebaseapp.com",
    });
   }

   estaLogueado(){
    return this._loginService.estaLogueado();
   }

   noLogueado(){
    return this._loginService.noLogueado();
   }
}
