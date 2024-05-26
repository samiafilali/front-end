import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlerteService {

  url="http://localhost:8080/alertes";
  //crud service de l'entité alerte
  
    constructor(private http:HttpClient) { }
  //recuperer la liste des alertes
    getAllAlertes(){
      return this.http.get(this.url);
    }
  
    //recuperer une alerte par son id
    getAlerteById(id){
      return this.http.get(this.url+"/"+
      id);
    }
    // ajouter une alerte
    addAlerte(alerte){
      return this.http.post(this.url,alerte);
    }


}
