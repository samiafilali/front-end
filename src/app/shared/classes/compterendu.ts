import { Alerte } from "./alerte";
import { Utilisateur } from "./utilisateur";
import { Base } from './base';

export interface CompteRendu extends Base{
    id: number;
    texte: string;
    date: Date;
    technicien: Utilisateur;
    alerte: Alerte;

    //constructor() {
      //  this.technicien = new Utilisateur();
        //this.alerte = new Alerte();
   // }
}