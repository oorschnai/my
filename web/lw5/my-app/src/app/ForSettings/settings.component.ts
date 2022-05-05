import { Component, OnInit  } from '@angular/core';
import {HttpService} from "../http.service";
import {Settings} from "../Classes/Classes";

@Component({
  selector: 'settings',
  templateUrl: `settings.component.html`,
  styleUrls: [`settings.component.css`],
  providers: [HttpService]
})

export class SettingsComponent implements OnInit{
  constructor(private httpService: HttpService){
  }
  settings: Settings=new Settings();
  ngOnInit() {
    this.httpService.get_settings().subscribe((data: any) => {
      this.settings=data;
    })
  }
  save(){
    this.httpService.save_set(this.settings).subscribe();
  }
}
