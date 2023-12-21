import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registrandose: boolean = false;

  constructor(private _loginService: LoginService) {}

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this._loginService.login(email, password);
  }

  toggleRegistro() {
    this.registrandose = !this.registrandose;
  }

  registrar(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
  
    this._loginService.registrar({ email, password });
  }
  
}
