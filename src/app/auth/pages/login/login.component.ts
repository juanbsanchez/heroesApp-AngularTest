import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private _router: Router) { }

  login(){

    //TODO: go to backend and get user

    this._router.navigate(['/heroes']);
  }


}
