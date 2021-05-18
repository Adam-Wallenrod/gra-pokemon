import {Component, OnInit} from '@angular/core';
import * as pokedex from 'pokedex-promise-v2';

export interface IPokemonNamesList {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokemon-app';
  pokedex = new pokedex();
  allPokemonsNames: IPokemonNamesList[];


  ngOnInit() {
    console.log('pokedex: ', this.pokedex);


    const interval = {
      limit : 150,
      offset: 0
    }


    this.pokedex.getPokemonsList(interval).then((response: object[]) => {
      this.allPokemonsNames = response.map(pokemon => pokemon['name']);
      console.log('allPokeNames: ', this.allPokemonsNames);
    });

  }

}
