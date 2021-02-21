import { Component, OnInit } from '@angular/core';
import * as pokedex from 'pokedex-promise-v2';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.sass']
})
export class DisplayComponent implements OnInit {

  constructor() { }

  pokedex = new pokedex();
  pokemonName: string;
  pokemon;

  ngOnInit() {

  }


  async onClick() {
    this.pokemon = await this.pokedex.getPokemonByName(this.pokemonName.toLowerCase());
    console.log('pokemon: ', this.pokemon);

  }

}
