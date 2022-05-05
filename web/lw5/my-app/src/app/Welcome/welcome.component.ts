import { Component, OnInit  } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'welcome',
  templateUrl: `welcome.component.html`,
  styleUrls: [`welcome.component.css`],
  providers: [HttpService]
})

export class WelcomeComponent implements OnInit{
  ngOnInit() {

  }
}
