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
    let allPokemons: any[];

    const interval = {
      limit : 150,
      offset: 0
    }


    this.pokedex.getPokemonsList(interval).then((response) => {

      allPokemons = response;
      console.log(allPokemons.map(pokemon => pokemon.name));
    });

  }

}
