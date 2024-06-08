import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/shared/classes/utilisateur';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  utilisateur: Utilisateur = {
    id: null,
    nom: '',
    email: '',
    motDePasse: '',
    numTelephone: '',
    grades: '',
    comptesRendu: []
  };

  submitted: boolean = false;
  error: string = '';
  successmsg: boolean = false;

  year: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;

    if (!this.utilisateur.nom || !this.utilisateur.email || !this.utilisateur.motDePasse || !this.utilisateur.numTelephone || !this.utilisateur.grades) {
      return;
    }

    if (environment.defaultauth === 'firebase') {
      this.authenticationService.register(this.utilisateur.email, this.utilisateur.motDePasse)
        .then((res: any) => {
          // Inscription Firebase réussie
          this.utilisateurService.addUtilisateur(this.utilisateur)
            .subscribe(
              data => {
                this.successmsg = true;
                if (this.successmsg) {
                  this.router.navigate(['/account/login']);
                }
              },
              error => {
                this.error = error ? error : '';
              });
        })
        .catch(error => {
          this.error = error ? error : '';
        });
    }
  }
}
