import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
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
  ajouterUtilisateur(utilisateur: Iutilisateur) {
    return this.http.post<Iutilisateur>(`${this.URL}/utilisateurs`, utilisateur);
  }
  mettreAJourUtilisateur(id, utilisateur: Iutilisateur) {
    return this.http.put<Iutilisateur>(`${this.URL}/utilisateur/${id}`, utilisateur);
  }
  supprimerUtilisateur(id) {
    return this.http.delete<any>(`${this.URL}/utilisateur/${id}`);
  }

  recupererBureaux() {
    return this.http.get<Ibureau[]>(`${this.URL}/bureaux`);
  }
  recupererBureau(id) {
    return this.http.get<Ibureau>(`${this.URL}/bureau/${id}`);
  }

  poserMaterielDansBureau(id_materiel, id_bureau){
    return this.http.put<Imateriel>(`${this.URL}/bureau/${id_bureau}/poserMateriel`, id_materiel);
  }
  retirerMaterielDuBureau(id_materiel, id_bureau){
    return this.http.put<Imateriel>(`${this.URL}/bureau/${id_bureau}/retirerMateriel`, id_materiel);
  }
  
  listerMaterielDuBureau(id_bureau){
    return this.http.get<Imateriel[]>(`${this.URL}/bureau/${id_bureau}/listeMateriel`);
  }
  recupererToutMateriel() {
    return this.http.get<Imateriel[]>(`${this.URL}/materiels`);
  }
  recupererMateriel(id) {
    return this.http.get<Imateriel>(`${this.URL}/materiel/${id}`);
  }
  ajouterMateriel(materiel: Imateriel) {
    return this.http.post<Imateriel>(`${this.URL}/materiels`, materiel);
  }
  mettreAJourMateriel(id, materiel: Imateriel) {
    return this.http.put<Imateriel>(`${this.URL}/materiel/${id}`, materiel);
  }
  supprimerMateriel(id) {
    return this.http.delete<any>(`${this.URL}/materiel/${id}`);
  }
  rechercherMateriel(recherche) {
    return this.http.get<Imateriel[]>(`${this.URL}/materiels/${recherche}`);
  }
}
