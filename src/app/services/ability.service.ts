import { Injectable } from '@angular/core';
import { Ability } from '../interfaces/ability';

// HTTP PARA LEER EL .JSON
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  abilities: Ability[] = []

  constructor(private http: HttpClient) { }

  // PROMESA QUE ESPERA A LEER EL JSON Y METERLO EN EL ARRAY ABILITIES
  async getAbilitiesFromJson() {
    this.abilities = await this.http.get('assets/abilities.json').toPromise() as Ability[]
    return this.abilities
  }

  // Función que, según un Pokémon, coge su atributo abilityId (Los pokémons guardan solo el ID de las habilidades 
  // que tienen), y según el ID de la habilidad, hace una búsqueda en el array de habilidades, buscando ese ID, 
  // y haciendo un Array con las habilidades que coinciden con la abilityId del pokémon.
  public getAbilitiesFromPokemon(pokemon: Pokemon) {

    var arrayAbilityIndex = 0;

    let searchedAbilities: Ability[] = [];

    for (let ability of this.abilities) {

      if (pokemon.abilityId.includes(ability.abilityId)) {
        searchedAbilities.push(this.abilities[arrayAbilityIndex]);
      }

      arrayAbilityIndex++;
    }
    
    return searchedAbilities
  }
}
