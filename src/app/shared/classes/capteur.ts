import { Refrigerateur } from "./refrigerateur";
import { Alerte } from './alerte';

export interface Capteur {
    id: number;
    type: string;
    Temperature, Humidite : number; 
    refrigerateur : Refrigerateur;
    alertes: Alerte[];

    //constructor() {
        //this.refrégirateur = new Refrégirateur();
       // this.alertes = [];
   // }
}
