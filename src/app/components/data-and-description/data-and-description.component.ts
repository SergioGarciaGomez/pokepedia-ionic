import { Component, Input, OnInit } from '@angular/core';
import { Ability } from 'src/app/interfaces/ability';
import { AbilityService } from 'src/app/services/ability.service';
import { Pokemon } from 'src/app/interfaces/pokemon';


@Component({
  selector: 'app-data-and-description',
  templateUrl: './data-and-description.component.html',
  styleUrls: ['./data-and-description.component.scss']
})
export class DataAndDescriptionComponent implements OnInit {

  // Objeto Pokémon recibido de la clase padre `pokemon-info` inicializado
  @Input() pokemon: Pokemon = {
    id: 0,
    name: '',
    abilityId: [],
    type: [],
    weakness: [],
    height: 0,
    weight: 0,
    ps: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    description: ''
  }

  // Array de habilidades vacío, listo para leer las habilidades del JSON
  abilities: Ability[] = [];

  constructor(public abilityService: AbilityService) { }

  async ngOnInit() {
    // En inicio, espera a cargar el aarray abilities del JSON
    this.abilities = await this.abilityService.getAbilitiesFromJson()
  }

  getAbilitiesFromPokemon(pokemon: Pokemon) {
    return this.abilityService.getAbilitiesFromPokemon(pokemon)
  }
}
