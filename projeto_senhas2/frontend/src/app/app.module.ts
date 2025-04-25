import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; // Importando IonicModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioPage } from './inicio/inicio.page'; // Componente standalone

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Inicializando Ionic
    AppRoutingModule,
    HttpClientModule,
    InicioPage  // Importando InicioPage diretamente
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
