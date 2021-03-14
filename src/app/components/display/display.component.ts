import {Component, HostListener, OnInit} from '@angular/core';
import * as pokedex from 'pokedex-promise-v2';

enum Cursors {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown'
}


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;

    console.log('context: ', this.context);

    switch (this.key) {
      case Cursors.LEFT:
        console.log('move left');
        this.movePokemonXPos(-20);
        break;

      case Cursors.RIGHT:
        console.log('move right');
        this.movePokemonXPos(20);
        break;


      case Cursors.DOWN:
        console.log('move down');
        this.movePokemonYPos(20);
        break;

      case Cursors.UP:
        console.log('move up');
        this.movePokemonYPos(-20);
        break;
    }

  }


  constructor() {
  }

  pokedex = new pokedex();
  pokemonName: string;
  pokemon;
  key;
  context: any;
  pokemonSpirte;
  xPos: number;
  yPos: number;

  ngOnInit() {

  }


  async fetchPokemon() {
    this.pokemon = await this.pokedex.getPokemonByName(this.pokemonName.toLowerCase());
    console.log('pokemon: ', this.pokemon);

    setTimeout(() => {
      this.placePokemonOnCanvas();
    });

  }


  placePokemonOnCanvas() {
    const canvas: HTMLCanvasElement = document.getElementById('game-arena') as HTMLCanvasElement;
    console.log('canvas: ', canvas);

    this.context = canvas.getContext('2d');
    console.log('context: ', this.context);

    this.setInBasePosition(this.pokemon.sprites.front_default);

  }


  setInBasePosition(url: string, x = 0, y = 0) {
    this.pokemonSpirte = new Image();
    this.pokemonSpirte.src = url;
    this.pokemonSpirte.onload = () => {
      this.context.drawImage(this.pokemonSpirte, 0, 0);
      this.xPos = 0;
      this.yPos = 0;
    };

  }


  movePokemonXPos(value: number) {
    this.context.clearRect(0,0, 600, 600);
    this.xPos = this.xPos + value;
    this.context.drawImage(this.pokemonSpirte, this.xPos, this.yPos);
  }

  movePokemonYPos(value: number) {
    this.context.clearRect(0,0, 600, 600);
    this.yPos = this.yPos + value;
    this.context.drawImage(this.pokemonSpirte, this.xPos, this.yPos);
  }


}
