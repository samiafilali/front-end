import { Alerte } from "./alerte";
import { Utilisateur } from "./utilisateur";

export interface CompteRendu {
    id: number;
    texte: string;
    technicien:Utilisateur;
    alerte:Alerte;
}
