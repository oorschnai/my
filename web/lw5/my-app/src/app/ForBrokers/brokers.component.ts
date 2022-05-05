import { Component, OnInit  } from '@angular/core';
import {HttpService} from "../http.service";
import {Broker} from "../Classes/Classes";

@Component({
  selector: 'brokers',
  templateUrl: `brokers.component.html`,
  styleUrls: [`brokers.component.css`],
  providers: [HttpService]
})

export class BrokersComponent implements OnInit {
  constructor(private httpService: HttpService) {
  }

  brokers: Broker[] = [];

  ngOnInit() {
    this.httpService.get_brokers().subscribe((data: any) => {
      this.brokers = data;
    })
  }

  remove(id: number) {
    this.brokers.splice(id, 1)
    for (let i = 0; i < this.brokers.length; i++) {
      this.brokers[i].id = i;
    }
  }

  add() {
    this.brokers.push(new Broker());
    for (let i = 0; i < this.brokers.length; i++) {
      this.brokers[i].id = i;
    }
  }
  save(){
    this.httpService.save_b(this.brokers).subscribe();
  }
}
