import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {


  @Input() pokemonsList: any[];
  pokemonName: string;

  constructor() { }

  ngOnInit() {
  }



}
