import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Utilisateur } from 'src/app/shared/classes/utilisateur';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { NgbdUserListSortableHeader } from './userlist-sortable.directive';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

export class UserlistComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Table data
  contactsList!: Observable<Utilisateur[]>;
  total: Observable<number>;
  createContactForm!: UntypedFormGroup;
  submitted = false;
  contacts: Utilisateur[] = [];
  files: File[] = [];
  imageURL: string | undefined;
  deleteId: any;

  @ViewChildren(NgbdUserListSortableHeader) headers!: QueryList<NgbdUserListSortableHeader>;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Gestion' }, { label: 'Supervision', active: true }];

    this.loadContacts();

    this.createContactForm = this.formBuilder.group({
      id: [''],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numTelephone: ['', [Validators.required]],
      grades: ['', [Validators.required]],
      img: [''],
    });
  }

  loadContacts() {
    this.utilisateurService.getAllUtilisateurs().subscribe((contacts: Utilisateur[]) => {
      this.contacts = contacts;
    });
  }

  // File Upload
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#member-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.createContactForm.controls['img'].setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }

  // Save User
  saveUser() {
    if (this.createContactForm.valid) {
      const utilisateurData = this.createContactForm.value;
      if (utilisateurData.id) {
        // Update existing user
        this.utilisateurService.addUtilisateur(utilisateurData).subscribe(() => {
          this.loadContacts();
        });
      } else {
        // Add new user
        this.utilisateurService.addUtilisateur(utilisateurData).subscribe((newUser: Utilisateur) => {
          this.contacts.push(newUser);
        });
      }
      this.createContactForm.reset();
      this.closeModal('newContactModal');
    }
  }

  // Edit User
  editUser(id: any) {
    this.submitted = false;
    this.openModal('newContactModal');

    const modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Profile';
    const updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    const listData = this.contacts[id];

    this.createContactForm.controls['id'].setValue(listData.id);
    this.createContactForm.controls['nom'].setValue(listData.nom);
    this.createContactForm.controls['email'].setValue(listData.email);
    this.createContactForm.controls['numTelephone'].setValue(listData.numTelephone);
    this.createContactForm.controls['grades'].setValue(listData.grades);
  }

  // Delete User
  removeUser(id: any) {
    this.deleteId = id;
    this.openModal('removeItemModal');
  }

  confirmDelete() {
    const userId = this.contacts[this.deleteId].id;
    this.utilisateurService.deleteUtilisateur(userId).subscribe(() => {
      this.contacts.splice(this.deleteId, 1);
      this.closeModal('removeItemModal');
    });
  }

  // Helper methods to open and close modals
  openModal(modalId: string) {
    const modal = new (window as any).bootstrap.Modal(document.getElementById(modalId));
    modal.show();
  }
  
  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
}
