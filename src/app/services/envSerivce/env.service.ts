import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  private BACK_END_URL = environment.BACK_END_URL;

  constructor(){}

  public getBaseUrl() {
    return this.BACK_END_URL;
  }

}
