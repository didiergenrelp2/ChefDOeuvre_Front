import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MaterielComponent } from './materiel/materiel.component';
import { BureauComponent } from './bureau/bureau.component';

const appRoutes: Routes = [
  { path: 'accueil', component: AccueilComponent},
  { path: 'utilisateur', component: UtilisateurComponent},
  { path: 'materiel', component: MaterielComponent},
  { path: 'bureau', component: BureauComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }