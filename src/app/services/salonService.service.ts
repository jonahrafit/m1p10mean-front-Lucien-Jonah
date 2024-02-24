import { v4 as uuidv4 } from 'uuid';

export interface SalonServiceModel {
    _id: Object,
    nom: String,
    prix: Number,
    duree: Number,
    commission: Number
}

const SALON_SERVICE_DATA: SalonServiceModel[] =
    [
        {
            _id: uuidv4(),
            nom: "Coupe de cheveux",
            prix: 30,
            duree: 45,
            commission: 0.10
        },
        {
            _id: uuidv4(),
            nom: "Coloration",
            prix: 50,
            duree: 60,
            commission: 0.15
        },
        {
            _id: uuidv4(),
            nom: "Manucure",
            prix: 20,
            duree: 30,
            commission: 0.08
        },
        {
            _id: uuidv4(),
            nom: "Massage",
            prix: 80,
            duree: 75,
            commission: 0.20
        }
    ];

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    constructor() { }

    getSalonServices(): SalonServiceModel[] {
        return SALON_SERVICE_DATA;
    }
}