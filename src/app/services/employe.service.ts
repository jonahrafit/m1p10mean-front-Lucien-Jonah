export interface TempEmploye {
    nom: String,
    prenom: String,
    email: String,
    estValide: boolean,
    estConfirme: boolean,
    tauxCommission: number
}

const ELEMENT_DATA: TempEmploye[] =
    [
        {
            nom: "Doe",
            prenom: "John",
            email: "john.doe@example.com",
            estValide: false,
            estConfirme: false,
            tauxCommission: 0.15
        },
        {
            nom: "Smith",
            prenom: "Alice",
            email: "alice.smith@example.com",
            estValide: true,
            estConfirme: false,
            tauxCommission: 0.12
        },
        {
            nom: "Johnson",
            prenom: "Michael",
            email: "michael.johnson@example.com",
            estValide: true,
            estConfirme: true,
            tauxCommission: 0.18
        },
        {
            nom: "Hernandez",
            prenom: "Daniel",
            email: "daniel.hernandez@example.com",
            estValide: true,
            estConfirme: true,
            tauxCommission: 0.13
        }
    ];

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor() { }

    getEmployees(): TempEmploye[] {
        return ELEMENT_DATA;
    }
}