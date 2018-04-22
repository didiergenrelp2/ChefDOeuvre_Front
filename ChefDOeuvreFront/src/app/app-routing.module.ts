import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MaterielComponent } from './materiel/materiel.component';
import { BureauComponent } from './bureau/bureau.component';
import { PoserMaterielDansBureauComponent } from './poser-materiel-dans-bureau/poser-materiel-dans-bureau.component';

const appRoutes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'utilisateurs', component: UtilisateurComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'bureaux', component: BureauComponent },
  { path: '**', component: AccueilComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }