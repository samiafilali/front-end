import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapteurService {

  url="http://localhost:8080/capteurs";
  //crud service de l'entité capteur
  
    constructor(private http:HttpClient) { }
  //recuperer la liste des capteurs
    getAllCapteurs(){
      return this.http.get(this.url);
    }
  
    //recuperer un capteur par son id
    getCapteurById(id){
      return this.http.get(this.url+"/"+id);
    }
    // supprimer un capteur
    deleteCapteur(id){
      return this.http.delete(this.url+"/"+id);
    }
    //ajouter un capteur
    addCapteur(capteur){
      return this.http.post(this.url,capteur);
    }



}
