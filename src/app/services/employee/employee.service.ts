import { Injectable } from '@angular/core';
import { EnvService } from '../envSerivce/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployee } from '../../models/IEmployee';
import { Observable } from 'rxjs';

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

  public getEmployeeById(id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${this.BACK_END_URL}/employees/${id}`, { headers });
  }

  public getAllEmployee(page: number = 1, size: number = 10) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(`${this.BACK_END_URL}/employees/${page}/${size}`, { headers });
  }

  public valideCompteEmploye(id: string, employeTemp: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(`${this.BACK_END_URL}/employees/${id}`, employeTemp, { headers });
  }

  public getListRendezVousBetweenDate(id: string, debut: string, fin: string): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any[]>(`${this.BACK_END_URL}/rendez-vous/employee/${id}/${debut}/${fin}`, { headers });
  }

  public getListRendezVous(id: string): Observable<any[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any[]>(`${this.BACK_END_URL}/rendez-vous/employee/${id}/tous`, { headers });
  }

  public enregistrerRendezVous(serviceId: string, employeId: string, dateRendezVous: any) {
    const clientId = '65cd0b59be55f90616207a16';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(`${this.BACK_END_URL}/rendez-vous/${clientId}/${serviceId}/${employeId}`, { dateRendezVous }, { headers });
  }
}
