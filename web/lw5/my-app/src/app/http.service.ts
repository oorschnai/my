import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }
  get_brokers() {
    return this.http.get('http://localhost:3000/brokers');
  }
  get_stocks() {
    return this.http.get('http://localhost:3000/stocks');
  }
  get_settings() {
    return this.http.get('http://localhost:3000/settings');
  }
  save_b(data: any) {
    const body = data;
    return this.http.post('http://localhost:3000/brokers', body);
  }
  save_s(data: any) {
    const body = data;
    return this.http.post('http://localhost:3000/stocks', body);
  }
  save_set(data: any) {
    const body = data;
    return this.http.post('http://localhost:3000/settings', body);
  }
}
