import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  // 
  url="http://localhost:8080/utilisateurs";
//crud service de l'entité utilisateur

  constructor(private http:HttpClient) { }

  //recuperer la liste des utilisateurs
  getAllUtilisateurs(){
    return this.http.get(this.url);
  }

  //recuperer un utilisateur par son id
  getUtilisateurById(id){
    return this.http.get(this.url+"/"+id);
  }

  //ajouter un utilisateur
  addUtilisateur(utilisateur){
    return this.http.post(this.url,utilisateur);
  }

  //modifier un utilisateur
  editUtilisateur(utilisateur){
    return this.http.put(this.url,utilisateur);
  }

  //supprimer un utilisateur
  deleteUtilisateur(id){
    return this.http.delete(this.url+"/"+id);
  }
}
