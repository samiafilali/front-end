import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefregirateurService {
  url="http://localhost:8080/refregirateurs";
  //crud service de l'entité utilisateur
  
    constructor(private http:HttpClient) { }
  //recuperer la liste des refregirateurs
    getAllRefregirateurs(){
      return this.http.get(this.url);
    }
  
    //recuperer un refregirateur par son id
    getRefregirateurById(id){
      return this.http.get(this.url+"/"+id);
    }
  
    //ajouter un refregirateur
    addRefregirateur(refregirateur){
      return this.http.post(this.url,refregirateur);
    }
  
    //modifier un refregirateur
    editRefregirateur(refregirateur){
      return this.http.put(this.url,refregirateur);
    }
  
    //supprimer un refregirateur
    deleteRefregirateur(id){
      return this.http.delete(this.url+"/"+id);
    }
    
}
