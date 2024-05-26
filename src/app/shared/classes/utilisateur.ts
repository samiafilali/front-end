import { CompteRendu } from "./compte-rendu";

export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    numTelephone: string;
    updatedAt: string;
    grade: string;
    comptesRendu:CompteRendu[];

}
