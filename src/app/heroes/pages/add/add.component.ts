import { Component, OnInit } from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroebyId(id))
      )
      .subscribe((heroe) => this.heroe = heroe)
  }

  save(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      //update
      this.heroesService.updateHeroe(this.heroe)
        .subscribe(resp => console.log('response', resp));
    }else{
      //create
      this.heroesService.addHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/edit', heroe.id])
        });
    }

  }

}
