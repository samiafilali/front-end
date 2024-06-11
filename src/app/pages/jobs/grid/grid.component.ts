import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompteRendu } from 'src/app/shared/classes/compterendu';
import { Utilisateur } from 'src/app/shared/classes/utilisateur';
import { CompteRenduService } from 'src/app/shared/services/compterendu.service';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { JobGridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [JobGridService, DecimalPipe]
})
export class GridComponent implements OnInit {

  modalRef?: BsModalRef;
  breadCrumbItems: Array<{}>;
  submitted: boolean = false;
  comptesRendus: CompteRendu[] = [];
  me: Utilisateur;
  compteRenduText: string = '';
  authUser:any
  constructor(
    private modalService: BsModalService,
    private utilisateurService: UtilisateurService,
    private compteRenduService: CompteRenduService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Compte rendu' }, { label: 'Compte rendu', active: true }];
    this.authUser = JSON.parse(sessionStorage.getItem('authUser'));
    console.log('Auth', this.authUser.email);
   // alert(this.authUser.email)
    if (this.authUser ) {
      this.getUtilisateur(this.authUser.email);
      console.log('User', this.authUser);
          
          if (this.authUser.grades === 'Admin') {
            this.fetchAllComptesRendus();
          } else {
            this.fetchAllComptesRendus();
          }
    }
  
      
    }
  

getUtilisateur(email: string) {
  this.utilisateurService.getOneUtilisateur(email).subscribe(
    (res: Utilisateur) => {
      this.authUser = res;
      this.me = res;
      console.log("me",this.authUser)
    },
    error => {
      console.error('Error fetching user', error);
    }
  );
}

  fetchAllComptesRendus() {
    this.compteRenduService.getAllCompteRendus().subscribe(
      (comptes: CompteRendu[]) => {
        this.comptesRendus = comptes;
        console.log('Comptes rendus', this.comptesRendus);
      },
      error => {
        console.error('Error fetching all comptes rendus', error);
      }
    );
  }

  

  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  addCompteRendu() {
    if (!this.compteRenduText.trim()) {
      return;
    }

    const newCompteRendu: CompteRendu = {
      id: 0,
      texte: this.compteRenduText,
      technicien: this.me,
      alerte: null,
      date: undefined,
      createdAt: '',
      updatedAt: ''
    };

    this.compteRenduService.saveCompteRendu(newCompteRendu).subscribe(
      (compteRendu: CompteRendu) => {
        this.comptesRendus.push(compteRendu);
        this.compteRenduText = ''; // Reset the input field
        this.modalRef?.hide(); // Close the modal
      },
      error => {
        console.error('Error saving compte rendu', error);
      }
    );
  }
}
