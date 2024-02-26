import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
export interface TempEmploye {
    _id: Object,
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
            _id: uuidv4(),
            nom: "Doe",
            prenom: "John",
            email: "john.doe@example.com",
            estValide: false,
            estConfirme: false,
            tauxCommission: 0.15
        },
        {
            _id: uuidv4(),
            nom: "Smith",
            prenom: "Alice",
            email: "alice.smith@example.com",
            estValide: true,
            estConfirme: false,
            tauxCommission: 0.12
        },
        {
            _id: uuidv4(),
            nom: "Johnson",
            prenom: "Michael",
            email: "michael.johnson@example.com",
            estValide: true,
            estConfirme: true,
            tauxCommission: 0.18
        },
        {
            _id: uuidv4(),
            nom: "Hernandez",
            prenom: "Daniel",
            email: "daniel.hernandez@example.com",
            estValide: true,
            estConfirme: true,
            tauxCommission: 0.13
        }
    ];

@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceTest {
    constructor() { }

    getEmployees(): TempEmploye[] {
        return ELEMENT_DATA;
    }

    getEmployeeById(id: string): TempEmploye | undefined {
        return ELEMENT_DATA.find(employee => employee._id === id);
    }
}
