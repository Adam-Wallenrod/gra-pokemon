import {Component, OnInit} from '@angular/core';
import * as pokedex from 'pokedex-promise-v2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokemon-app';
  pokedex = new pokedex();




  ngOnInit() {
    console.log('pokedex: ', this.pokedex);

    let myPokemon = this.pokedex.getPokemonByName('charmander').then(
      value => {
        console.log('value: ', value);
      }

    );

  }

}
