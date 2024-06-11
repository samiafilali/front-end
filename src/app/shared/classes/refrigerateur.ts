import { Capteur } from './capteur';

export interface Refrigerateur {
    id: number;
    label: string;
    temperatureMax: number;
    temperatureMin: number;
    emplacement: string;
    capteur: Capteur;

   // constructor() {
       // this.capteur = new Capteur();
   // }
}