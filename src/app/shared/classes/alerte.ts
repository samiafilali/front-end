import { CompteRendu } from "./compte-rendu";
import { Refrégirateur } from "./refrégirateur";

export interface Alerte {
id: number;
type:string;
refregirateur:Refrégirateur[];
compteRendu:CompteRendu;
}

