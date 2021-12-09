import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';


// HTTP PARA LEER EL .JSON
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: Pokemon[] = []

  constructor(private http: HttpClient) { }

  // PROMESA QUE ESPERA A LEER EL JSON Y METERLO EN LA VARIABLE POKEMON
  async getPokemonsFromJson() {
    this.pokemons = await this.http.get('assets/pokemons.json').toPromise() as Pokemon[]
    // Ordenado en ID ascendente por defecto
    this.ascIdFilter()
    return this.pokemons
  }

  // Ordena el array de pokemons por ID ascendente
  public ascIdFilter() {
    return this.pokemons.sort((a, b) => a.id - b.id)
  }

  // Ordena el array de pokemons por ID descendente
  public descIdFilter() {
    return this.pokemons.sort((a, b) => (b.id - a.id))
  }

  // Ordena el array de pokemons por nombre ascendente
  public ascNameFilter() {
    this.pokemons.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    return this.pokemons
  }

  // Ordena el array de pokemons por nombre descendente
  public descNameFilter() {
    this.pokemons.sort(function (a, b) {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    })
    return this.pokemons
  }

  // Función que devuelve un Pokémon en función de su ID
  public getPokemon(id: number): Pokemon {
    return { ...this.pokemons.filter(pokemon => pokemon.id === id)[0] }
  }

  // Hace un array de los IDs, coge el valor más pequeño dentro de esos ID's y devuelve el pokemon con ese Id, 
  // para devolver el primero de la lista
  public getFirstPokemon(): Pokemon {
    let primerId = Math.min(...this.pokemons.map(function(object){ return object.id; }))
    return this.getPokemon(primerId)
  }

  // Hace un array de los IDs, coge el valor más grande dentro de esos ID's y devuelve el pokemon con ese Id, 
  // para devolver el último de la lista
  public getLastPokemon(): Pokemon {
    let ultimoId = Math.max(...this.pokemons.map(function(o){ return o.id; }))
    return this.getPokemon(ultimoId)
  }

  // Función que saca la posición anterior a el ID que pasámos por parámetro en el array de pokemons, a partir de 
  // un array auxiliar con los ID's.
  public getPreviousPokemon(id: number): Pokemon {

    // Obtengo un array de los id
    const arrayId = this.pokemons.map(array => array.id)
    let position = 0

    for (let x = 0; x < arrayId.length; x++) {
      if (id > arrayId[x]) {
        position++
      }
    }

    // Igualo el nuevo Id a la posicion anterior del array, justo antes de encontrarse con el Id pasado 
    // por parámetro [POSICION - 1]
    let newId = arrayId[position - 1]
    
    return this.getPokemon(newId)
  }

  // Función que saca la posición siguiente a el ID que pasámos por parámetro en el array de pokemons, a partir de 
  // un array auxiliar con los ID's.
  public getNextPokemon(id: number): Pokemon {

    // Obtengo un array de los id
    let arrayId = this.pokemons.map(array => array.id)
    var position = 0
    
    // En este caso queremos sacar la posición siguiente, porque queremos sacar el próximo Pokémon
    // así que a la posición final le hacemos + 1
    for (let x = 0; x < arrayId.length; x++) {
      if (id > arrayId[x]) {
        position++
      }
    }

    // Igualo el nuevo Id a la posicion siguiente del array, justo antes de encontrarse con el Id pasado 
    // por parámetro [POSICION + 1]
    let newId = arrayId[position + 1]
    
    return this.getPokemon(newId)
  }

  // Obtiene los ID de los pokemons para seleccionar uno aleatoriamente, ya que si lo hiciera directamente con
  // el .lenght del Array principal, si el Array mide 50, y meto el Pokémon número 400, solo saldrán IDs entre
  // 1 y 50, no entre los IDs que hay.
  public getRandomId() {
    // Obtengo un array de los id
    let arrayId = this.pokemons.map(array => array.id)
    // Posición aleatoria en el array de Id's
    return arrayId[Math.floor(Math.random() *arrayId.length)]
  }
}
