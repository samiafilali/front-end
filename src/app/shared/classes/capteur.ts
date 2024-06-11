import { Refrigerateur } from "./refrigerateur";
import { Alerte } from './alerte';

export interface Capteur {
    id: number;
    type: string;
    valeur: number; 
    refrigerateur : Refrigerateur;
    alertes: Alerte[];

    //constructor() {
        //this.refrégirateur = new Refrégirateur();
       // this.alertes = [];
   // }
}
