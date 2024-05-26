import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompteRenduService {
  url="http://localhost:8080/rendu";
  //crud service de l'entité compte rendu
  
    constructor(private http:HttpClient) { }
  //recuperer la liste des compte rendus
    getAllCompteRendus(){
      return this.http.get(this.url);
    }
  
    //recuperer un compte rendu par son id
    getCompteRenduById(id){
      return this.http.get(this.url+"/"+id);
    }
  
    //ajouter un compte rendu
    addCompteRendu(compteRendu){
      return this.http.post(this.url,compteRendu);
    }
  
    //modifier un compte rendu
    editCompteRendu(compteRendu){
      return this.http.put(this.url,compteRendu);
    }
  
    //supprimer un compte rendu
    deleteCompteRendu(id){
      return this.http.delete(this.url+"/"+id);
    }
}
