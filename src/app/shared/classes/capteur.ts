import { Refrégirateur } from "./refrégirateur";

export interface Capteur {
    type: string;
    valeur: number; 
    refregirateur:Refrégirateur
}
