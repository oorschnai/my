import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import {WelcomeComponent} from "./Welcome/welcome.component";
import {StocksComponent} from "./ForStocks/stocks.component";
import {SettingsComponent} from "./ForSettings/settings.component";
import {BrokersComponent} from "./ForBrokers/brokers.component";

const routes: Routes = [
  {path: "main", component: WelcomeComponent},
  {path: "stocks", component: StocksComponent},
  {path: "settings", component: SettingsComponent},
  {path: "brokers", component: BrokersComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StocksComponent,
    SettingsComponent,
    BrokersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
