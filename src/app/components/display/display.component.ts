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

  readonly canvasWidth = 600;
  readonly canvasHeight = 600;

  pokedex = new pokedex();
  pokemonName: string;
  pokemon;
  key;
  context: any;
  pokemonSpirte;
  xPos: number;
  yPos: number;

  /**
   * Looks like pokemon image size is always the same.
   * 96px x 96px.
   */
  pokemonWidth = 96;
  pokemonHeight = 96;


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    this.movePokemon();
  }


  constructor() {
  }


  ngOnInit() {

  }


  movePokemon() {
    console.log('context: ', this.context);

    switch (this.key) {
      case Cursors.LEFT:
        console.log('move left');
        this.movePokemonXPos(-this.pokemonWidth);
        break;

      case Cursors.RIGHT:
        console.log('move right');
        this.movePokemonXPos(this.pokemonWidth);
        break;


      case Cursors.DOWN:
        console.log('move down');
        this.movePokemonYPos(this.pokemonHeight);
        break;

      case Cursors.UP:
        console.log('move up');
        this.movePokemonYPos(-this.pokemonHeight);
        break;
    }

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
    console.log('poke: ', this.pokemonSpirte);
    this.pokemonSpirte.src = url;
    this.pokemonSpirte.onload = () => {
      this.onPokemonLoad();
    };

  }


  onPokemonLoad() {
    this.context.drawImage(this.pokemonSpirte, 0, 0);
    this.resetPokemonPosition();
    // this.pokemonWidth = this.pokemonSpirte.naturalWidth;
    // this.pokemonHeight = this.pokemonSpirte.naturalHeight;
    // console.log('this.pokemonWidth: ', this.pokemonWidth);
    // console.log('this.pokemonHeight: ', this.pokemonHeight);
  }

  resetPokemonPosition() {
    this.xPos = 0;
    this.yPos = 0;
  }


  movePokemonXPos(value: number) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.xPos = this.xPos + value;

    if (this.xPos > this.canvasWidth - this.pokemonWidth) {
      this.xPos = this.canvasWidth - this.pokemonWidth;
    } else if (this.xPos < 0) {
      this.xPos = 0;
    }

    console.log('%c xPos: ', 'color: blue', this.xPos);
    this.context.drawImage(this.pokemonSpirte, this.xPos, this.yPos);
  }

  movePokemonYPos(value: number) {
    this.context.clearRect(0, 0, 600, 600);
    this.yPos = this.yPos + value;
    if (this.yPos > this.canvasHeight - this.pokemonHeight) {
      this.yPos = this.canvasHeight - this.pokemonHeight;
    } else if (this.yPos < 0) {
      this.yPos = 0;
    }

    console.log('%c yPos: ', 'color: blue', this.yPos);
    this.context.drawImage(this.pokemonSpirte, this.xPos, this.yPos);
  }


}
