import { Component, OnInit } from '@angular/core';
import {Heroe} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Heroe[] = [];
  heroeSelected!: Heroe | undefined;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  searching(){
    this.heroesService.getSuggestions(this.term.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  optionSelected(event: MatAutocompleteSelectedEvent){

    if(event.option.value !== ''){
      const heroe: Heroe = event.option.value;
      this.term = heroe.superhero;

      this.heroesService.getHeroebyId(heroe.id!)
        .subscribe(heroe => this.heroeSelected = heroe)
    }

    this.heroeSelected = undefined;
    return;

  }
}
