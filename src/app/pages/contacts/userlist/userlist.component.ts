import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UtilisateurService, Utilisateur } from 'src/app/shared/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  contacts: Utilisateur[] = [];
  total: Observable<number>;
  createContactForm: FormGroup;
  selectedUser: Utilisateur | null = null;

  constructor(
    private utilisateurService: UtilisateurService,
    private fb: FormBuilder,
    private router: Router // Inject Router
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Supervision', active: true }];
    this.loadUtilisateurs();

    this.createContactForm = this.fb.group({
      nom: ['', Validators.required],
      numTelephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      grades: ['', Validators.required]
    });
  }

  loadUtilisateurs() {
    this.utilisateurService.getAllUtilisateurs().subscribe(utilisateurs => {
      this.contacts = utilisateurs;
    });
  }

  ajouterUtilisateur() {
    const newUser: Utilisateur = this.createContactForm.value;
    this.utilisateurService.addUtilisateur(newUser).subscribe(() => {
      this.loadUtilisateurs();
      this.createContactForm.reset();
    });
  }

  modifierUtilisateur(utilisateur: Utilisateur) {
    this.selectedUser = utilisateur;
    this.createContactForm.patchValue(utilisateur);
  }

  supprimerUtilisateur(id: number) {
    this.utilisateurService.deleteUtilisateur(id).subscribe(() => {
      this.loadUtilisateurs();
    });
  }

  saveUser() {
    if (this.createContactForm.valid) {
      if (this.selectedUser) {
        const updatedUser: Utilisateur = { ...this.selectedUser, ...this.createContactForm.value };
        this.utilisateurService.updateUtilisateur(updatedUser).subscribe(() => {
          this.loadUtilisateurs();
          this.selectedUser = null;
          this.createContactForm.reset();
        });
      } else {
        this.ajouterUtilisateur();
      }
    }
  }

  removeUser(id: number) {
    this.confirmDelete(id);
  }

  confirmDelete(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.supprimerUtilisateur(id);
    }
  }

  editUser(user: Utilisateur) {
    this.router.navigate(['/user-profile', user.id]);
  }
}
