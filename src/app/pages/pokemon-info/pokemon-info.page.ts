import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { GeneralService } from 'src/app/services/general.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.page.html',
  styleUrls: ['./pokemon-info.page.scss'],
})
export class PokemonInfoPage implements OnInit {

  pokemon: Pokemon;
  pAnterior: Pokemon;
  pSiguiente: Pokemon;
  pPrimero: Pokemon;
  pUltimo: Pokemon;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.pokemon = this.pokemonService.getPokemon(+id)
      this.pAnterior = this.pokemonService.getPreviousPokemon(+id);
      this.pSiguiente = this.pokemonService.getNextPokemon(+id);
      this.pPrimero = this.pokemonService.getFirstPokemon();
      this.pUltimo = this.pokemonService.getLastPokemon();
    }
  }

  formatId(id: number): string {
    return this.generalService.formatId(id)
  }

  // Navega al Pokémon clickado en función de su ID, si el ID es undefined, simplemente navega a /pokedex
  // y refresca el ngOnInit
  goPokemonInfo(id: number) {
    this.router.navigateByUrl(`/pokedex/${id != null ? id : ''}`);
    
  }
}
