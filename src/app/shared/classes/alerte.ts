import { Base } from './base';
import { Utilisateur } from './utilisateur';
import { Capteur } from './capteur';
import { CompteRendu } from './compterendu';

export interface Alerte extends Base{
id: number;
type:string;
status: string;
technicien: Utilisateur;
compteRendu:CompteRendu;
capteur: Capteur;
RefrigerateurLabel: string;

//constructor() {
   // super();
    //this.technicien = new Utilisateur();
    //this.capteur = new Capteur();
    //this.compteRendu = new CompteRendu();
//}
}

