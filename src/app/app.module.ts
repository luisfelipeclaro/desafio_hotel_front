import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HospedesComponent } from './hospedes/hospedes.component';

import {HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './index/index.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HospedeService } from './shared/hospede.service';
import { ReservaService } from './shared/reserva.service';
import { ReservasComponent } from './reservas/reservas.component';
import {SelectModule} from 'ng-select';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HospedesComponent,
    IndexComponent,
    ReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ],
  providers: [HospedeService, ReservaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
