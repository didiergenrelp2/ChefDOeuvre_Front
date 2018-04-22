import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Iutilisateur } from './iutilisateur';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Injectable()
export class UtilisateurService {

  constructor(private api: ApiService) { }

  updateUtilisateur$: Subject<any> = new Subject<any>();
  selectedUtilisateur: Iutilisateur;

  recupererTousLesUtilisateurs(): Observable<Iutilisateur[]> {
    return this.api.recupererTousLesUtilisateurs() as Observable<Iutilisateur[]>;
  }

  ajouterUtilisateur(utilisateur: Iutilisateur): Observable<Iutilisateur> {
    return this.api.ajouterUtilisateur(utilisateur).pipe(tap(data => this.updateUtilisateur$.next()));
  }

  mettreAJourUtilisateur(utilisateur: Iutilisateur): Observable<Iutilisateur> {
    return this.api
      .mettreAJourUtilisateur(utilisateur.id_utilisateur, utilisateur)
      .pipe(tap(data => this.updateUtilisateur$.next()));
  }

  supprimerUtilisateur(id) {
    return this.api.supprimerUtilisateur(id).pipe(tap(data => this.updateUtilisateur$.next()))
  }

}
