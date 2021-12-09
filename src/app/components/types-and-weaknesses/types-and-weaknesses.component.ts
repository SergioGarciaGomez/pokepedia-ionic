import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-types-and-weaknesses',
  templateUrl: './types-and-weaknesses.component.html',
  styleUrls: ['./types-and-weaknesses.component.scss'],
})
export class TypesAndWeaknessesComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit() {}

}
