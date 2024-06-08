import { CompteRendu } from "./compte-rendu";

export interface Utilisateur {
  id: number;
  nom: string;
  prenom?: string; // Facultatif si non requis
  email: string;
  motDePasse: string;
  numTelephone: string;
  updatedAt?: string; // Facultatif si non requis
  grades: string;
  comptesRendu?: CompteRendu[]; // Facultatif si non requis
}
