import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonInfoPageRoutingModule } from './pokemon-info-routing.module';
import { PokemonInfoPage } from './pokemon-info.page';
import { DataAndDescriptionComponent } from 'src/app/components/data-and-description/data-and-description.component';
import { TypesAndWeaknessesComponent } from 'src/app/components/types-and-weaknesses/types-and-weaknesses.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonInfoPageRoutingModule
  ],
  declarations: [PokemonInfoPage, DataAndDescriptionComponent, TypesAndWeaknessesComponent]
})
export class PokemonInfoPageModule {}
