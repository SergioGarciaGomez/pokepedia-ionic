import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

// HTTP PARA LEER JSON
import { HttpClientModule } from '@angular/common/http';

// COMPONENTES
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [AppComponent, MenuComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
