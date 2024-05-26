import { Alerte } from "./alerte";
import { Utilisateur } from "./utilisateur";

export interface CompteRendu {
    id: number;
    text: string;
    utilisateur:Utilisateur;
    alerte:Alerte;
}
