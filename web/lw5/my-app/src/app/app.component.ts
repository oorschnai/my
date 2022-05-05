import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Главная";
  constructor(private router: Router) {}
  openMain(): void{
    this.router.navigate(['/main'])
    this.title="Главная"
  }
  openStocks(): void{
    this.router.navigate(['/stocks'])
    this.title="Акции"
  }
  openBrokers(): void{
    this.router.navigate(['/brokers'])
    this.title="Брокеры"
  }
  openSettings(): void{
    this.router.navigate(['/settings'])
    this.title="Настройки"
  }
}
