import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';

import { NgForm } from '@angular/forms';
import { Utilisateur } from 'src/app/shared/classes/utilisateur';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  utilisateur: Utilisateur = {
    id: null,
    nom: '',
    email: '',
    motDePasse: '',
    numTelephone: '',
    grades: null,
    compteRendus: [],
    alertes: []
  };
  error: string = '';
  successmsg: boolean = false;

  constructor(
    private route: ActivatedRoute,private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    const authUser = JSON.parse(sessionStorage.getItem('authUser'));
    if (authUser) {
      this.getUtilisateur(authUser.email);
    }
  }

  getUtilisateur(email: string) {
    this.utilisateurService.getOneUtilisateur(email).subscribe(
      (res: Utilisateur) => {
        this.utilisateur = res;
      },
      error => {
        this.error = error ? error : '';
      }
    );
  }

  updateUtilisateur(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.utilisateurService.addUtilisateur(this.utilisateur).subscribe(
      (res: Utilisateur) => {
        this.successmsg = true;
        this.getUtilisateur(this.utilisateur.email); // Recharger les données de l'utilisateur après mise à jour
      },
      error => {
        this.error = error ? error : '';
      }
    );
  }
}
