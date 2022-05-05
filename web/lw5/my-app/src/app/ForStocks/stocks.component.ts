import { Component, OnInit  } from '@angular/core';
import {HttpService} from "../http.service";
import {Stock} from "../Classes/Classes";

@Component({
  selector: 'stocks',
  templateUrl: `stocks.component.html`,
  styleUrls: [`stocks.component.css`],
  providers: [HttpService]
})

export class StocksComponent implements OnInit{
  constructor(private httpService: HttpService){
  }
  stocks: Stock[]=[];
  ngOnInit() {
    this.httpService.get_stocks().subscribe((data: any) => {
      this.stocks=data;
    })
  }
  remove(id: number){
    this.stocks.splice(id,1)
    for(let i=0;i<this.stocks.length;i++){
      this.stocks[i].id=i;
    }
  }
  add(){
    this.stocks.push(new Stock());
    for(let i=0;i<this.stocks.length;i++){
      this.stocks[i].id=i;
    }
  }
  save(){
    this.httpService.save_s(this.stocks).subscribe();
  }
}
