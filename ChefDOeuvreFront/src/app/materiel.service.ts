import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Imateriel } from './imateriel';
import { Ibureau } from './ibureau';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Injectable()
export class MaterielService {

  constructor(private api: ApiService) { }

  update$: Subject<any> = new Subject<any>();
  selectedMateriel: Imateriel;

  recupererToutMateriel(): Observable<Imateriel[]> {
    return this.api.recupererToutMateriel() as Observable<Imateriel[]>;
  }
  recupererMateriel(id_materiel): Observable<Imateriel> {
    return this.api.recupererMateriel(id_materiel) as Observable<Imateriel>;
  }

  ajouterMateriel(materiel: Imateriel): Observable<Imateriel> {
    return this.api.ajouterMateriel(materiel).pipe(tap(data => this.update$.next()));
  }

  mettreAJourMateriel(materiel: Imateriel): Observable<Imateriel> {
    return this.api
      .mettreAJourMateriel(materiel.id_materiel, materiel)
      .pipe(tap(data => this.update$.next()));
  }

  supprimerMateriel(id_materiel) {
    return this.api.supprimerMateriel(id_materiel).pipe(tap(data => this.update$.next()));
  }

  poserMaterielDansBureau(id_materiel: number,id_bureau: number): Observable<Imateriel>{
    return this.api.poserMaterielDansBureau(id_materiel, id_bureau);
  }

  retirerMaterielDuBureau(id_materiel: number,id_bureau: number): Observable<Imateriel>{
    return this.api.retirerMaterielDuBureau(id_materiel, id_bureau);
  }

  rechercherMateriel(recherche): Observable<Imateriel[]>{
    return this.api.rechercherMateriel(recherche) as Observable<Imateriel[]>;
  }
  listerMaterielDuBureau(id_bureau): Observable<Imateriel[]> {
    return this.api.listerMaterielDuBureau(id_bureau) as Observable<Imateriel[]>;
  }

}
