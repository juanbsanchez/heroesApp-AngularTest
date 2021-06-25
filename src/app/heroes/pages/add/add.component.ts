import { Component, OnInit } from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../components/confirm/confirm.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px;
    }
    `
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
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog) { }

  ngOnInit(): void {

    if(!this._router.url.includes('edit')){
      return;
    }

    this._activatedRoute.params
      .pipe(
        switchMap(({id}) => this._heroesService.getHeroebyId(id))
      )
      .subscribe((heroe) => this.heroe = heroe)
  }

  save(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      //update
      this._heroesService.updateHeroe(this.heroe)
        .subscribe(resp => this.showSnackbar('Heroe Updated'));
    }else{
      //create
      this._heroesService.addHeroe(this.heroe)
        .subscribe(heroe => {
          this._router.navigate(['/heroes/edit', heroe.id])
          this.showSnackbar('Heroe Created')
        });
    }

  }

  delete(){

    const dialog = this._dialog.open(ConfirmComponent, {
      width: '250px',
      data: {...this.heroe} // use this if there could be any modification in object
    });

    dialog.afterClosed()
      .subscribe(
        (result) => {
          if(result){
            this._heroesService.deleteHeroe(this.heroe.id!)
              .subscribe(resp => {
                this._router.navigate(['/heroes']);
              })
          }
        })
  }

  showSnackbar(message: string): void{
    this._snackBar.open(message, 'Close', {
      duration: 2500,
    });
  }

}
