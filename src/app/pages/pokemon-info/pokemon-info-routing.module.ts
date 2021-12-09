import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonInfoPage } from './pokemon-info.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonInfoPageRoutingModule {}
