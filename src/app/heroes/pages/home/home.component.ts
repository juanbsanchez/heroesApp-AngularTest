import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin: 20px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this._router.navigate(['./auth'])
  }



}
