import { Component, OnInit } from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroes.interface";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC Comics desc'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics desc'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
