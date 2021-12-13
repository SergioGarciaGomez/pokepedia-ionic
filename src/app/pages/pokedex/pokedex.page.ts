import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { AbilityService } from 'src/app/services/ability.service';
import { GeneralService } from 'src/app/services/general.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

	pokemons: Pokemon[] = [];
  pokemon: Pokemon;

  constructor(
    public pokemonService: PokemonService, 
    public abilityService: AbilityService, 
		public generalService: GeneralService,
    private router: Router,
    private actionSheetController: ActionSheetController
    ) { }

  async ngOnInit() {

    // RECUPERA LOS POKEMONS DEL SERVICIO Y LOS GUARDA EN EL ARRAY POKEMONS
    this.pokemons = await this.pokemonService.getPokemonsFromJson();

  }

  async openMenuOrdenarPor() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ordenar por...',
      buttons: [
        { text: 'ID ascendente', 
          handler: () => { this.ascIdFilter(); }
        },
        { text: 'ID descendente', 
          handler: () => { this.descIdFilter(); } 
        },
        { text: 'Nombre ascendente',
        handler: () => { this.ascNameFilter(); } 
        },
        { text: 'Nombre descendente',
        handler: () => { this.descNameFilter(); } 
        },
        { text: 'Cancelar', role: 'destructive' },
      ],
      mode: 'ios',
      animated: true,
      backdropDismiss: true
    });

    await actionSheet.present();
  }

  // Navega al Pokémon clickado en función de su ID, si el ID es undefined, simplemente navega a /pokedex
  goPokemonInfo(id: number) {
    this.router.navigateByUrl(`/pokedex${id != undefined ? '/' + id : ''}`);
  }

  // Navega a un Pokémon aleatorio, de entre todos los registrados
  goToRandomPokemon() {
    const id = this.pokemonService.getRandomId() 
    this.router.navigateByUrl(`/pokedex${id != undefined ? '/' + id : ''}`);
  }

  // Filtro por id ascendente
  ascIdFilter() {
    this.pokemonService.ascIdFilter();
  }

  // Filtro por id descendente
  descIdFilter() {
    this.pokemonService.descIdFilter();
  }

  // Filtro por nombre ascendente
  ascNameFilter() {
    this.pokemonService.ascNameFilter();
  }

  // Filtro por nombre descendente
  descNameFilter() {
    this.pokemonService.descNameFilter();
  }
}
