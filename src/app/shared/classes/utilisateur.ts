import { CompteRendu } from "./compterendu";
import { Alerte } from './alerte';

export enum Grades {
  Technicien = 'Technicien',
  Admin = 'Admin'
}

export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  motDePasse: string;
  numTelephone: string;
  grades: Grades;
  compteRendus: CompteRendu[];
  alertes: Alerte[];

  //constructor() {
    //this.compteRendus = [];
    //this.alertes = [];
//}
}
