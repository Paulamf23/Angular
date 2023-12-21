import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  constructor(private _loginService:LoginService){}

  estaLogueado(){
    return this._loginService.estaLogueado();
   }

}
