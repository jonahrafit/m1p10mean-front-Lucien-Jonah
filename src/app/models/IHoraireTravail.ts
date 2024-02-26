import { ITemps } from "./ITemps";

export interface IHoraireTravail {
    jour: string;
    temps: ITemps[];
    date_creation: string;
}