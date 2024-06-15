import { Capteur } from './capteur';

export interface Refrigerateur {
    id: number;
    label: string;
    temperatureMax,temperatureMin, humiditeMin, humiditeMax: number;
    emplacement: string;
    capteur: Capteur;

   // constructor() {
       // this.capteur = new Capteur();
   // }
}