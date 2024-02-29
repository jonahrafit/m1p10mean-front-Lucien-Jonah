import { Injectable } from '@angular/core';
import { EnvService } from '../envSerivce/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private BACK_END_URL;
  constructor(private envService: EnvService, private httpClient: HttpClient) {
    this.BACK_END_URL = this.envService.getBaseUrl();
  }

  public login(email: string, motDePasse: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email, motDePasse: motDePasse }; // Les données à envoyer dans le corps de la requête
    return this.httpClient.post(`${this.BACK_END_URL}/auth/login`, body, { headers });
  }
}
