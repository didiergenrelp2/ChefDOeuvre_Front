import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Iutilisateur } from './iutilisateur';
import { Ibureau } from './ibureau';
import { Imateriel } from './imateriel';

@Injectable()
export class ApiService {
  URL: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  recupererTousLesUtilisateurs() {
    return this.http.get<Iutilisateur[]>(`${this.URL}/utilisateurs`);
  }  
  mettreAJourUtilisateur(id, utilisateur: Iutilisateur) {
    return this.http.put<Iutilisateur>(`${this.URL}/utilisateur/${id}`, utilisateur);
  }  
  ajouterUtilisateur(utilisateur: Iutilisateur) {
    return this.http.post<Iutilisateur>(`${this.URL}/utilisateurs`, utilisateur);
  }  
  supprimerUtilisateur(id) {
    return this.http.delete<any>(`${this.URL}/utilisateur/${id}`);
  }

  getBureau() {
    return this.http.get<Ibureau[]>(`${this.URL}/bureaux`);
  }

  recupererToutMateriel() {
    return this.http.get<Imateriel[]>(`${this.URL}/materiels`);
  }
  ajouterMateriel(materiel: Imateriel){
    return this.http.post<Imateriel>(`${this.URL}/materiels`, materiel);
  }
  mettreAJourMateriel(id, materiel: Imateriel){
    return this.http.put<Imateriel>(`${this.URL}/materiel/${id}`, materiel);
  }
  supprimerMateriel(id){
    return this.http.delete<any>(`${this.URL}/materiel/${id}`);
  }
}
