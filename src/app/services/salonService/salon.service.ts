import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EnvService } from '../envSerivce/env.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private BACK_END_URL;
  constructor(private envService: EnvService, private httpClient: HttpClient,
    private route: Router) {
    this.BACK_END_URL = this.envService.getBaseUrl();
  }


  public getServices(page: number, size: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${this.BACK_END_URL}/services/${page}/${size}`, { headers });
  }

}
