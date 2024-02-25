import { Injectable } from '@angular/core';
import { EnvService } from '../envSerivce/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BACK_END_URL;
  constructor(private envService: EnvService, private httpClient: HttpClient) {
    this.BACK_END_URL = this.envService.getBaseUrl();
  }


  public getEmployeeHasService(serviceId: string, page: number, size: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${this.BACK_END_URL}/employees/avec/services/by-id/${serviceId}/${page}/${size}`, { headers });
  }
}
