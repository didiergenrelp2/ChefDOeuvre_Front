import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Imateriel } from './imateriel';
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
  recupererMateriel(id): Observable<Imateriel> {
    return this.api.recupererMateriel(id) as Observable<Imateriel>;
  }

  ajouterMateriel(materiel: Imateriel): Observable<Imateriel> {
    return this.api.ajouterMateriel(materiel).pipe(tap(data => this.update$.next()));
  }

  mettreAJourMateriel(materiel: Imateriel): Observable<Imateriel> {
    return this.api
      .mettreAJourMateriel(materiel.id_materiel, materiel)
      .pipe(tap(data => this.update$.next()));
  }

  supprimerMateriel(id) {
    return this.api.supprimerMateriel(id).pipe(tap(data => this.update$.next()));
  }

  poserMaterielDansBureau(materiel: Imateriel): Observable<Imateriel>{
    return this.api.poserMaterielDansBureau(materiel.id_materiel, materiel);
  }

  rechercherMateriel(recherche): Observable<Imateriel[]>{
    return this.api.rechercherMateriel(recherche) as Observable<Imateriel[]>;
  }

}
